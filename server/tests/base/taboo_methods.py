"""Классы предоставляющие тесты для наиболее общих случаев"""
from abc import ABC

from django.test import TestCase
from rest_framework import status
from .decorators import total_users, total_users_and_none, no_auth_user, banned_users


class AbstractMixin(ABC):
    """Базовый класс для создания стандартных тестов"""
    uri = None
    model = None
    users = None
    obj_uri = None


class TabooBase(AbstractMixin):
    @classmethod
    def check(cls, response):
        TestCase().assertIn(response.status_code, (
            status.HTTP_401_UNAUTHORIZED,
            status.HTTP_403_FORBIDDEN,
            status.HTTP_404_NOT_FOUND,
        ))


class TabooListMixin(TabooBase):
    """Тест на запрет получения массива объектов любым пользователем"""
    @total_users_and_none
    def test_taboo_list(self, user):
        response = user.get(self.uri)
        self.check(response)


class TabooRetrieveMixin(TabooBase):
    """Тест на запрет получения объекта по id любым пользователем"""
    @total_users
    def test_taboo_retrieve(self, user):
        response = user.get(self.obj_uri)
        self.check(response)


class TabooCreateMixin(TabooBase):
    """Тест на запрет создания объекта любым пользователем"""
    @total_users_and_none
    def test_taboo_create(self, user):
        response = user.post(self.uri)
        self.check(response)


class TabooDeleteMixin(TabooBase):
    """Тест на запрет удаления объекта любым пользователем"""
    @total_users_and_none
    def test_taboo_delete(self, user):
        response = user.delete(self.obj_uri)
        self.check(response)


class TabooUpdateMixin(TabooBase):
    """Тест на запрет изменения объекта любым пользователем"""
    @total_users_and_none
    def test_taboo_update(self, user):
        response = user.patch(self.obj_uri)
        self.check(response)


class TabooTotalMixin(TabooListMixin, TabooRetrieveMixin, TabooCreateMixin, TabooDeleteMixin, TabooUpdateMixin):
    pass


class TabooNoAuthListMixin(TabooBase):
    """Тест на запрет получения массива объектов неавторизованным пользователем"""
    @no_auth_user
    def test_taboo_no_auth_list(self, user):
        response = user.get(self.uri)
        self.check(response)


class TabooNoAuthRetrieveMixin(TabooBase):
    """Тест на запрет получения объекта неавторизованным пользователем"""
    @no_auth_user
    def test_taboo_no_auth_retrieve(self, user):
        response = user.get(self.obj_uri)
        self.check(response)


class TabooNoAuthCreateMixin(TabooBase):
    """Тест на запрет создания объекта неавторизованным пользователем"""
    @no_auth_user
    def test_taboo_no_auth_create(self, user):
        response = user.post(self.uri)
        self.check(response)


class TabooNoAuthDeleteMixin(TabooBase):
    """Тест на запрет удаления объекта неавторизованным пользователем"""
    @no_auth_user
    def test_taboo_no_auth_delete(self, user):
        response = user.delete(self.obj_uri)
        self.check(response)


class TabooNoAuthUpdateMixin(TabooBase):
    """Тест на запрет изменения объекта неавторизованным пользователем"""
    @no_auth_user
    def test_taboo_no_auth_update(self, user):
        response = user.patch(self.obj_uri)
        self.check(response)


class TabooNoAuthTotalMixin(
    TabooNoAuthListMixin,
    TabooNoAuthRetrieveMixin,
    TabooNoAuthCreateMixin,
    TabooNoAuthDeleteMixin,
    TabooNoAuthUpdateMixin
):
    pass


class TabooBannedListMixin(TabooBase):
    """Тест на запрет получения массива объектов заблокированным пользователем"""
    @banned_users
    def test_taboo_banned_list(self, user):
        response = user.get(self.uri)
        self.check(response)


class TabooBannedRetrieveMixin(TabooBase):
    """Тест на запрет получения объекта заблокированным пользователем"""
    @banned_users
    def test_taboo_banned_retrieve(self, user):
        response = user.get(self.obj_uri)
        self.check(response)


class TabooBannedCreateMixin(TabooBase):
    """Тест на запрет создания объекта заблокированным пользователем"""
    @banned_users
    def test_taboo_banned_create(self, user):
        response = user.post(self.uri)
        self.check(response)


class TabooBannedDeleteMixin(TabooBase):
    """Тест на запрет удаления объекта заблокированным пользователем"""
    @banned_users
    def test_taboo_banned_delete(self, user):
        response = user.delete(self.obj_uri)
        self.check(response)


class TabooBannedUpdateMixin(TabooBase):
    """Тест на запрет изменения объекта заблокированным пользователем"""
    @banned_users
    def test_taboo_banned_update(self, user):
        response = user.patch(self.obj_uri)
        self.check(response)


class TabooBannedTotalMixin(
    TabooBannedUpdateMixin,
    TabooBannedDeleteMixin,
    TabooBannedListMixin,
    TabooBannedCreateMixin,
    TabooBannedRetrieveMixin
):
    pass
