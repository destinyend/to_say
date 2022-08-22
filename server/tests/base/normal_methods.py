"""Декораторы миксины для тестирования типичного поведения API для активных пользователей"""
from abc import ABC
from rest_framework import status
from server.tests.base.decorators import active_users


class BaseActiveUserMixin(ABC):
    uri = None
    first_object_id = None
    check_response_types = None
    data_types = None


class ActiveUserDeleteMixin(BaseActiveUserMixin):
    """Тест на возможность удаления объекта активным пользователем"""
    @active_users
    def test_delete(self, user):
        response = user.delete(self.uri + f'{self.first_object_id}/')
        self.check_response_types(
            response,
            status.HTTP_204_NO_CONTENT,
            many=False
        )


class ActiveUserListMixin(BaseActiveUserMixin):
    """Тест на получение массива объектов активным пользователем"""
    @active_users
    def test_list(self, user):
        response = user.get(self.uri)
        self.check_response_types(
            response,
            status.HTTP_200_OK,
            self.data_types,
            many=True
        )


class ActiveUserRetrieveMixin(BaseActiveUserMixin):
    """Тест на получение одиночного активным пользователем"""
    @active_users
    def test_retrieve(self, user):
        response = user.get(self.uri + f'{self.first_object_id}/')
        self.check_response_types(
            response,
            status.HTTP_200_OK,
            self.data_types,
            many=False
        )


class ActiveUserTotalMixin(ActiveUserListMixin, ActiveUserRetrieveMixin, ActiveUserDeleteMixin):
    pass


