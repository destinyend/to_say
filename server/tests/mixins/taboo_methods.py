"""Классы предоставляющие тесты для наиболее общих случаев"""
from django.test import TestCase
from rest_framework import status
from server.tests.mixins.abstract import AbstractMixin
from server.tests.mixins.decorators import total_users, total_users_and_none, no_auth_user, banned_users


class TabooBase(AbstractMixin):
    @classmethod
    def check(cls, response):
        TestCase().assertIn(response.status_code, (
            status.HTTP_401_UNAUTHORIZED,
            status.HTTP_403_FORBIDDEN,
            status.HTTP_404_NOT_FOUND,
            status.HTTP_405_METHOD_NOT_ALLOWED
        ))


class TabooListMixin(TabooBase):
    @total_users_and_none
    def test_taboo_list(self, user):
        response = user.get(self.uri)
        self.check(response)


class TabooRetrieveMixin(TabooBase):
    @total_users
    def test_taboo_retrieve(self, user):
        object_id = self.get_object_id()
        response = user.get(self.uri + f'/{object_id}')
        self.check(response)


class TabooCreateMixin(TabooBase):
    @total_users_and_none
    def test_taboo_create(self, user):
        response = user.post(self.uri)
        self.check(response)


class TabooDeleteMixin(TabooBase):
    @total_users_and_none
    def test_taboo_delete(self, user):
        object_id = self.get_object_id()
        response = user.delete(self.uri, f'{object_id}/')
        self.check(response)


class TabooUpdateMixin(TabooBase):
    @total_users_and_none
    def test_taboo_delete(self, user):
        object_id = self.get_object_id()
        response = user.patch(self.uri, f'{object_id}/')
        self.check(response)


class TabooTotalMixin(TabooListMixin, TabooRetrieveMixin, TabooCreateMixin, TabooDeleteMixin, TabooUpdateMixin):
    pass


class TabooNoAuthListMixin(TabooBase):
    @no_auth_user
    def test_taboo_no_auth_list(self, user):
        response = user.get(self.uri)
        self.check(response)


class TabooNoAuthRetrieveMixin(TabooBase):
    @no_auth_user
    def test_taboo_no_auth_retrieve(self, user):
        object_id = self.get_object_id()
        response = user.get(self.uri + f'/{object_id}')
        self.check(response)


class TabooNoAuthCreateMixin(TabooBase):
    @no_auth_user
    def test_taboo_no_auth_create(self, user):
        response = user.post(self.uri)
        self.check(response)


class TabooNoAuthDeleteMixin(TabooBase):
    @no_auth_user
    def test_taboo_no_auth_delete(self, user):
        object_id = self.get_object_id()
        response = user.delete(self.uri, f'{object_id}/')
        self.check(response)


class TabooNoAuthUpdateMixin(TabooBase):
    @no_auth_user
    def test_taboo_no_auth_delete(self, user):
        object_id = self.get_object_id()
        response = user.patch(self.uri, f'{object_id}/')
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
    @banned_users
    def test_taboo_banned_list(self, user):
        response = user.get(self.uri)
        self.check(response)


class TabooBannedRetrieveMixin(TabooBase):
    @banned_users
    def test_taboo_banned_retrieve(self, user):
        object_id = self.get_object_id()
        response = user.get(self.uri + f'/{object_id}')
        self.check(response)


class TabooBannedCreateMixin(TabooBase):
    @banned_users
    def test_taboo_banned_create(self, user):
        response = user.post(self.uri)
        self.check(response)


class TabooBannedDeleteMixin(TabooBase):
    @banned_users
    def test_taboo_banned_delete(self, user):
        object_id = self.get_object_id()
        response = user.delete(self.uri, f'{object_id}/')
        self.check(response)


class TabooBannedUpdateMixin(TabooBase):
    @banned_users
    def test_taboo_banned_delete(self, user):
        object_id = self.get_object_id()
        response = user.patch(self.uri, f'{object_id}/')
        self.check(response)


class TabooBannedTotalMixin(
    TabooBannedUpdateMixin,
    TabooBannedDeleteMixin,
    TabooBannedListMixin,
    TabooBannedCreateMixin,
    TabooBannedRetrieveMixin
):
    pass















