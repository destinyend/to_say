import os.path
import secrets
import string
from random import randint
from unittest.mock import patch

from django.db.models import Q
from server.models import Desk, Card
from server.tests.base import *
from server.tests.test_models import UserBaseTest
from server.views import DesksView


class UsersViewTest(UserBaseTest, BaseViewsTest, UnauthorizedTestMixin, TabooMethodsTestMixin):
    def __init__(self, *args, **kwargs):
        super(UsersViewTest, self).__init__(*args, **kwargs)
        self.uri = '/users/'
        self.taboo_methods = ('get', 'post', 'delete')

    def test_self(self):
        """Получение данных о самом себе"""
        for user_template in self.user_templates:
            self.user = User.objects.get(username=user_template['username'])
            response = self.user.get(self.uri + 'self/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertDictContainsSubset(response.data, user_template)


def generate_name():
    alphabet = string.ascii_letters + string.digits + 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' + ' ' * 10
    name = ''
    for _ in range(randint(5, 20)):
        if randint(0, 1):
            name += secrets.choice(alphabet).upper()
        else:
            name += secrets.choice(alphabet)
    return name


class DesksViewTest(BaseViewsTest, UnauthorizedTestMixin, TabooMethodsTestMixin):
    def __init__(self, *args, **kwargs):
        super(DesksViewTest, self).__init__(*args, **kwargs)
        self.uri = '/desks/'
        self.taboo_methods = ('get',)

    def setUp(self):
        users = UsersViewTest()
        users.setUp()
        self.user_templates = users.user_templates
        self.desk_templates = self.generate_params({
            'owner': (
                None,
                User.objects.filter(status=User.StatusChoice.ACTIVE)[0],
                User.objects.filter(status=User.StatusChoice.BANNED)[0],
            ),
            'description': ('', 'some text'),
            'access': (Desk.AccessChoice.PUBLIC, Desk.AccessChoice.PRIVATE)
        })

        for n in range(len(self.desk_templates)):
            self.desk_templates[n]['name'] = generate_name().strip()
            self.desk_templates[n]['id'] = n + 1

        self.desk_templates[1]['name'] = self.desk_templates[0]['name'][:4]

        users = User.objects.all()
        for desk in self.desk_templates:
            d = Desk.objects.create(**desk)
            for _ in range(randint(0, len(users) - 1)):
                n = randint(0, len(users) - 1)
                d.users.add(users[n])

    def test_download_available_desks(self):
        """Получение изучаемых колод"""
        for user_template in self.user_templates:
            self.user = User.objects.get(id=user_template['id'])
            response = self.user.get(self.uri + 'download_available_desks/')
            if user_template['status'] == User.StatusChoice.ACTIVE:
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                expected = Desk.objects.filter(
                    Q(users__id=self.user.id, access=Desk.AccessChoice.PUBLIC) | Q(owner_id=self.user.id)
                ).distinct()
                self.assertEqual(len(response.data), expected.count())
            else:
                self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_find(self):
        """Поиск колод по имени"""
        for user_template in self.user_templates:
            self.user = User.objects.get(id=user_template['id'])
            index = randint(0, len(self.desk_templates) - 1)
            text = self.desk_templates[index]['name'][:-3]
            response = self.user.get(self.uri + 'find/', {'name': text})  # проверка на неверный параметр
            if user_template['status'] == User.StatusChoice.ACTIVE:
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

                response = self.user.get(self.uri + 'find/', {'text': ''})  # проверка на пустой запрос
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

                response = self.user.get(self.uri + 'find/', {'text': text})  # правильный запрос
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                count = Desk.objects.filter(
                    Q(name__istartswith=text) &
                    Q(Q(owner__id=user_template['id']) | Q(access=Desk.AccessChoice.PUBLIC))
                ).distinct().count()
                self.assertEqual(len(response.data), count)

                response = self.user.get(self.uri + 'find/', {'text': text.upper()})
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                self.assertEqual(len(response.data), count)
            else:
                self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create(self):
        for user_template in self.user_templates:
            self.user = User.objects.get(id=user_template['id'])
            args = {
                'name': 'test',
                'description': '',
                'access': 'public',
                'is_learning': randint(0, 1)
            }
            response = self.user.post(self.uri, args)

            if user_template['status'] == User.StatusChoice.ACTIVE:
                self.assertEqual(response.status_code, status.HTTP_201_CREATED)

                exists = Desk.objects.filter(id=response.data['id'], owner__id=self.user.id).exists()
                self.assertTrue(exists)  # есть ли права на колоду
                # попытка создать колоду без имени
                args['name'] = ''
                response = self.user.post(self.uri, args)
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            else:
                self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_patch(self):
        for user_template in self.user_templates[:8]:
            self.user = User.objects.get(id=user_template['id'])
            for d in Desk.objects.all():
                response = self.user.patch(self.uri + f'{d.id}/', {'name': 'test'})
                if user_template['status'] == User.StatusChoice.ACTIVE:
                    if d.owner and d.owner.id == self.user.id:
                        self.assertEqual(response.status_code, status.HTTP_200_OK)
                        response = self.user.patch(self.uri + f'{d.id}/', {'name': ''})
                        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
                    else:
                        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
                else:
                    self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete(self):
        for user_template in self.user_templates[:8]:
            self.user = User.objects.get(id=user_template['id'])
            for d in Desk.objects.all():
                response = self.user.delete(self.uri + f'{d.id}/')
                if user_template['status'] == User.StatusChoice.ACTIVE:
                    if d.owner and d.owner.id == self.user.id:
                        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
                    else:
                        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
                else:
                    self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CardsViewTest(BaseViewsTest, UnauthorizedTestMixin):
    def __init__(self, *args, **kwargs):
        super(CardsViewTest, self).__init__(*args, **kwargs)
        self.uri = '/cards/'

    def setUp(self):
        desks = DesksViewTest()
        desks.setUp()
        self.user_templates = desks.user_templates
        self.desk_templates = desks.desk_templates
        self.card_templates = self.generate_params({
            'desk': ([d for d in Desk.objects.all()[:8]]),
            'side_one': ('question 1', 'question 2', 'question 3', 'question 4', 'question 5', 'question 6'),
            'side_two': ('ответ 1', 'ответ 2', 'ответ 3', 'ответ 4', 'ответ 5', 'ответ 6')
        })

        for card in self.card_templates:
            Card.objects.create(**card)

    def test_load_cards_in_desks(self):
        """Загрузка карт по массиву id колод"""
        for user_template in self.user_templates[:1]:
            self.user = User.objects.get(id=user_template['id'])
            desks = Desk.objects.all()[:4]
            ides = ','.join(str(d.id) for d in desks)
            response = self.user.get(self.uri + 'load_cards_in_desks/', {'ides': ides})
            if user_template['status'] == User.StatusChoice.ACTIVE:
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                expected = 0
                for d in desks:
                    expected += d.cards.all().count()

                self.assertEqual(expected, len(response.data))
            else:
                self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)



















