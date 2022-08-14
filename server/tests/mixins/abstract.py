from abc import ABC
from typing import Literal

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from server.models import User


class AbstractMixin(ABC):
    """Базовый класс для создания стандартных тестов"""
    uri = None
    model = None
    users = None

    def get_object_id(self):
        return self.model.objects.all().values('id')[0]


USER_TYPES = Literal['active', 'banned', 'none']
REQUEST_TYPE = Literal['get', 'post', 'delete', 'create', 'patch']


class Client(APIClient):
    """Класс для выполнения запросов. Клиент есть User"""
    def __init__(self, user: User = None):
        super(Client, self).__init__()
        self._user = user
        if self._user:
            self.force_authenticate(self._user)

    def __getattr__(self, item):
        return getattr(self._user, item, None)


class BaseViewsTest(TestCase):
    fixtures = ('test_data.json',)
    _user = None

    def setUp(self):
        pass

    @property
    def uri(self):
        return self._uri

    @uri.setter
    def uri(self, value: str):
        assert isinstance(value, str), 'Свойство uri должно быть строкой'
        assert len(value) > 1, 'uri должен содержать как минимум 2 символа'
        if not value.startswith('/'):
            value = '/' + value
        if not value.endswith('/'):
            value += '/'
        self._uri = value

    def check_interface(self, obj:dict, interface: dict):
        self.assertEqual(len(obj), len(interface))
        for key, type_ in interface.items():
            self.assertIn(key, obj)
            self.assertIsInstance(obj[key], type_)


class UserGetter:
    """Создает клиентов(User) всех возможных типов, включая неавторизованного, для выполнения запросов"""
    __instance = None
    index = -1

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '__instance'):
            cls.__instance = super(UserGetter, cls).__new__(cls)
        return cls.__instance

    def __init__(self):
        users = [Client()]
        for user in User.objects.all():
            users.append(Client(user))
        self.users = users

    def __iter__(self):
        self.index = -1
        return self

    def __next__(self):
        self.index += 1
        if self.index < len(self.users):
            return self.users[self.index]
        raise StopIteration





