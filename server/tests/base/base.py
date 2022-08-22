from typing import Literal
from django.test import TestCase
from rest_framework import test, status
from server.models import User

USER_TYPES = Literal['active', 'banned', 'none']
REQUEST_TYPE = Literal['get', 'post', 'delete', 'create', 'patch']


class TypeOrNone:
    def __init__(self, data_type):
        self.data_type = data_type


class APIClient(test.APIClient):
    """Класс для выполнения запросов. APIClient есть User"""

    def __init__(self, user: User = None):
        super(APIClient, self).__init__()
        self._user = user
        if self._user:
            self.force_authenticate(self._user)

    def __getattr__(self, item):
        return getattr(self._user, item, None)


class BaseViewsTest(TestCase):
    fixtures = ('test.json',)
    _user = None
    model = None
    _first_object_id = None
    _obj_uri = None

    def setUp(self):
        pass

    @property
    def first_object_id(self):
        if not self._first_object_id:
            self._first_object_id = self.model.objects.first().id
        return self._first_object_id

    @property
    def uri(self):
        return self._uri

    @property
    def obj_uri(self):
        if not self._obj_uri:
            self._obj_uri = self.uri + f'{self.first_object_id}/'
        return self._obj_uri

    @uri.setter
    def uri(self, value: str):
        assert isinstance(value, str), 'Свойство uri должно быть строкой'
        assert len(value) > 1, 'uri должен содержать как минимум 2 символа'
        if not value.startswith('/'):
            value = '/' + value
        if not value.endswith('/'):
            value += '/'
        self._uri = value

    def check_response_types(self, response, status_code: status, data_type: dict = None, many=False):
        assert response, 'the query function should return dict or list, not None!'
        self.assertEqual(response.status_code, status_code)
        if not data_type:
            return
        if many:
            for obj in response.data:
                self.check_data_type(obj, data_type)
        else:
            self.check_data_type(response.data, data_type)

    def check_data_type(self, response_data: dict, data_types: dict):
        obj = response_data
        try:
            self.assertEqual(len(obj), len(data_types))
            for key, _type in data_types.items():
                self.assertTrue(key in obj)
                if isinstance(_type, TypeOrNone):
                    if obj[key] is None:
                        continue
                    _type = _type.data_type
                self.assertTrue(isinstance(obj[key], _type))
        except AssertionError as e:
            print(f'{e} | {obj} expected: {data_types}')
            raise e


class UserGetter:
    """Создает APIClients(User) всех возможных типов, включая неавторизованного, для выполнения запросов"""
    __instance = None
    index = -1

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '__instance'):
            cls.__instance = super(UserGetter, cls).__new__(cls)
        return cls.__instance

    def __init__(self):
        users = [APIClient()]
        for user in User.objects.all():
            users.append(APIClient(user))
        self.users = users

    def __iter__(self):
        self.index = -1
        return self

    def __next__(self):
        self.index += 1
        if self.index < len(self.users):
            return self.users[self.index]
        raise StopIteration
