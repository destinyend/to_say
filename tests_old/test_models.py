# from datetime import datetime
#
# from server.models import Desk
# from server.tests.base import *
#
#
# class UserBaseTest(BaseTest):
#     """Базовый класс тестирования User в test_models"""
#     user_templates = None
#
#     def setUp(self):
#         args = {
#             'status': (User.StatusChoice.BANNED, User.StatusChoice.ACTIVE),
#             'password_valid_until': (None, datetime(year=2030, month=1, day=1), datetime.now()),
#             'auto_translate': (True, False),
#             'auto_sound': (True, False),
#             'sound_on': (True, False),
#             'learning_speed': (0.5, 1),
#             'learning_mode': (User.LearningMode.EN_TO_RU, User.LearningMode.RU_TO_EN),
#         }
#         expected_variants_count = self.get_variants_count(args)
#         self.user_templates = self.generate_params(args)
#         assert expected_variants_count == len(self.user_templates), 'ошибка генерации'
#         for n in range(len(self.user_templates)):
#             self.user_templates[n]['username'] = f'user{n}@user.ru'
#             self.user_templates[n]['id'] = n+1
#
#         for user in self.user_templates:
#             User.objects.create(**user)
#
#
# class TestUserModel(UserBaseTest):
#     def test_can_send_password(self):
#         for user in self.user_templates:
#             user = User.objects.get(username=user['username'])
#             is_time_valid = (not user.password_valid_until) or datetime.now() > user.password_valid_until
#             self.assertEqual(
#                 user.can_send_password(),
#                 is_time_valid and user.status == user.StatusChoice.ACTIVE
#             )
#
#
# class TestDeskModel(BaseTest):
#     def setUp(self):
#         self.desk_templates = self.generate_params({
#             'owner': (
#                 None,
#                 User.objects.filter(status=User.StatusChoice.ACTIVE)[0],
#                 User.objects.filter(status=User.StatusChoice.BANNED)[0]
#             ),
#             'description': ('', 'some text')
#         })
#
#         for n in range(len(self.desk_templates)):
#             self.desk_templates[n]['username'] = f'desk {n}'
#
#         for user in self.desk_templates:
#             Desk.objects.create(**user)
