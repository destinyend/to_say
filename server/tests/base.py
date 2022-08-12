import copy
from abc import abstractmethod, ABC
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from server.models import User


class BaseTest(TestCase, ABC):
    """
    Базовый класс для подготовки БД к тестированию.
    При наследовании необходимо переопределить метод setUp
    В методе setUp необходимо определить uri и allows_methods.
    Метод self.setUp - своего рода конструктор для тестов
    """
    _uri = None
    _allow_methods = None
    _expected_variants_count = -1

    @abstractmethod
    def setUp(self):
        pass

    @classmethod
    def get_variants_count(cls, args: dict):
        """Вычисляет число возможных комбинаций и возвращает его"""
        n = 1
        for key in args:
            n *= len(args[key])
        return n

    @classmethod
    def generate_params(cls, args: dict, params=None):
        """Комбинирует возможные варианты и возвращает список возможных комбинаций"""
        if not len(args):
            cls._generator_self_test(params)
            return params

        if params is None:
            cls._expected_variants_count = cls.get_variants_count(args)  # для cls._generator_self_test
            params = []
            for key, diapason in args.items():
                for variant in diapason:
                    params.append({key: variant})
                args.pop(key)
                return cls.generate_params(args, params)

        for key, diapason in args.items():
            extended_params = []
            for variant in diapason:
                new_values = cls._extend_params(params, key, variant)
                extended_params += new_values
            args.pop(key)
            return cls.generate_params(args, extended_params)

    @classmethod
    def _extend_params(cls, params: [], key: str, variant):
        """Расширение существующих наборов параметров новыми вариантами значений"""
        new_params = copy.deepcopy(params)
        for n in range(len(params)):
            new_params[n][key] = variant
        return new_params

    @classmethod
    def _generator_self_test(cls, params):
        """Самотестирование результатов генерации шаблонов"""
        assert cls._expected_variants_count == len(params), f'ошибка генерации ожидалось:' \
                                                            f' {cls._expected_variants_count} получено: {len(params)}'
        ides = []
        for p in params:
            assert id(p) not in ides, f'ошибка генерации: присутствуют ссылки на один и тот же объект'
            ides.append(id(p))


class BaseViewsTest(BaseTest, ABC):
    _user = None

    @property
    def uri(self):
        return self._uri

    @uri.setter
    def uri(self, value: str):
        assert isinstance(value, str), 'Свойство uri должно быть строкой'
        assert len(value) > 1, 'uri должен содержать как минимум 2 символа'
        assert value.startswith('/'), 'uri должен начинаться c "/"'
        assert value.endswith('/'), 'uri должен заканчиваться на "/"'
        self._uri = value

    @property
    def user(self):
        if not self._user:
            self._user = APIClient()
            user = User.objects.filter(status=User.StatusChoice.ACTIVE)[0]
            self._user.force_authenticate(user=user)
            self._user.id = user.id
        return self._user

    @user.setter
    def user(self, user):
        assert isinstance(user, User), 'user must be a server.User instance'
        self._user = APIClient()
        self._user.force_authenticate(user=user)
        self._user.id = user.id


class TabooMethodsTestMixin:
    """
    Проверка на избыточные стандартные методы ApiClient. Кортеж self.taboo_methods должен быть определен в self.__init__
    """
    taboo_methods = None

    def test_taboo_methods(self):
        assert self.taboo_methods, 'свойство taboo_methods должно быть определенно в self.__init__'
        for method in self.taboo_methods:
            response = getattr(self.user, method)(self.uri)
            self.assertTrue(response.status_code in (status.HTTP_403_FORBIDDEN, status.HTTP_405_METHOD_NOT_ALLOWED))


class UnauthorizedTestMixin:
    """Предоставляет тест неавторизованного пользователя,
    taboo_for_unauthorized - кортеж запрещенных методов, может быть переопределен в self.__init__"""
    taboo_for_unauthorized = ('get', 'post', 'delete', 'patch')

    def test_taboo_for_unauthorized(self):
        """Проверяет запрещен ли доступ для неавторизованных пользователей"""
        assert self.uri, "self.uri должен быть определен в self.__init__"
        client = APIClient()
        for method in self.taboo_for_unauthorized:
            response = getattr(client, method)(self.uri)
            self._check_taboo_response(response)
            if method == 'get':
                response = getattr(client, method)(self.uri + '1/')
                self._check_taboo_response(response)

    def _check_taboo_response(self, response):
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
