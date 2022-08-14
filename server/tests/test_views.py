from django.db.models import Q
from rest_framework import status
from server.models import User, Desk, Card, LearningProgress
from server.tests.mixins.decorators import  active_users, banned_users, no_auth_user
from server.tests.mixins.taboo_methods import TabooListMixin, TabooRetrieveMixin, TabooCreateMixin, TabooDeleteMixin, \
    TabooBannedTotalMixin, TabooNoAuthTotalMixin
from server.tests.mixins.abstract import BaseViewsTest



def serialize(obj, fields):
    return {key: getattr(obj, key) for key in fields}


class UsersViewTest(
    BaseViewsTest,
    TabooListMixin,
    TabooRetrieveMixin,
    TabooCreateMixin,
    TabooDeleteMixin
):
    def setUp(self):
        self.uri = 'users'
        self.model = User

    def get_self_response(self, user):
        return user.get(self.uri + 'self/')

    @active_users
    def test_self(self, user):
        response = self.get_self_response(user)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = serialize(
            User.objects.get(id=user.id),
            ('id', 'username', 'auto_translate', 'auto_sound', 'learning_speed', 'learning_mode', 'sound_on')
        )
        self.assertEqual(response.data, expected_data)


class DesksViewTest(BaseViewsTest, TabooNoAuthTotalMixin, TabooBannedTotalMixin, TabooRetrieveMixin, TabooListMixin):
    def setUp(self):
        self.uri = 'desks'
        self.model = Desk

    def get_download_available_desks(self, user):
        return user.get(self.uri + 'download_available_desks/')

    @active_users
    def test_download_available_desks_for_active(self, user):
        response = self.get_download_available_desks(user)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        qs = Desk.objects.filter(Q(owner_id=user.id) | Q(users__id=user.id, access=Desk.AccessChoice.PUBLIC))
        self.assertEqual(len(response.data), qs.count())
        if qs.count():
            interface = {'id': int, 'name': str, 'description': str, 'access': str, 'owner': int, 'is_learning': int,
                         'cards_in_desk': int, 'cards_studied': int}
            self.check_interface(response.data[0], interface)

    @banned_users
    def test_download_available_desks_for_banned(self, user):
        response = self.get_download_available_desks(user)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    @no_auth_user
    def test_download_available_desks_for_no_auth(self, user):
        response = self.get_download_available_desks(user)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def get_find(self, user, args=None):
        return user.get(self.uri + 'find/', args)

    @active_users
    def test_find_empty_for_active(self, user):
        response = self.get_find(user, {'text': ''})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @active_users
    def test_find_for_active(self, user):
        for d in Desk.objects.all():
            text = d.name[1: -1]
            response = self.get_find(user, {'text': text})
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            # доработать
            # qs = Desk.objects.filter(
            #     Q(name__icontains=text) & (Q(owner_id=user.id) | Q(access=Desk.AccessChoice.PUBLIC))
            # ).distinct()
            # self.assertEqual(len(response.data), qs.count())

    @banned_users
    def test_find_for_banned(self, user):
        response = self.get_find(user)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    @no_auth_user
    def test_find_for_no_auth(self, user):
        response = self.get_find(user)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CardsViewTest(BaseViewsTest, TabooNoAuthTotalMixin, TabooBannedTotalMixin, TabooRetrieveMixin, TabooListMixin):
    def setUp(self):
        self.model = Card
        self.uri = 'cards'


class LearningProgressViewTest(
    BaseViewsTest,
    TabooNoAuthTotalMixin,
    TabooBannedTotalMixin,
    TabooRetrieveMixin,
    TabooListMixin
):
    def setUp(self):
        self.model = LearningProgress
        self.uri = 'learningprogress'

