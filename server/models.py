from datetime import datetime, timedelta
from random import randint
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db.models import *


class UserManager(BaseUserManager):
    def create_user(self, username, **kwargs) -> 'User':
        user = self.model(username=username, **kwargs)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None) -> 'User':
        return self.create_user(username, is_staff=True, is_superuser=True)

    def create_staffuser(self, username, ) -> 'User':
        return self.create_user(username, is_staff=True)


class User(AbstractUser):
    class StatusChoice(TextChoices):
        ACTIVE = 'a'
        BANNED = 'b'
        SUPERUSER = 's'
        MODERATOR = 'm'

    class LearningMode(TextChoices):
        EN_AND_RU = 'en+ru'
        EN_TO_RU = 'en>ru'
        RU_TO_EN = 'ru>en'

    objects = UserManager()

    #  email, предполагается расширение с возможностью использовать телефон и др.
    username = CharField(max_length=64, db_index=True, unique=True)
    email = None
    PASSWORD_VALID_MINUTES = 5
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    status = CharField(max_length=1, default=StatusChoice.ACTIVE, choices=StatusChoice.choices)

    # время до которого действует код авторизации, время когда можно повторно запросить код
    password_valid_until = DateTimeField(blank=True, null=True)
    auto_translate = BooleanField(default=True)  # автоматически переводить карточки
    auto_sound = BooleanField(default=True)  # автоматически озвучивать карточки

    # используется на фронт-энде вместе с Learning.step для вычисления времени следующего показа карточек
    learning_speed = FloatField(default=5)
    learning_mode = CharField(max_length=5, choices=LearningMode.choices, default=LearningMode.EN_TO_RU)
    sound_on = BooleanField(default=True)

    def can_send_password(self) -> bool:
        """
        Проверка возможности сгенерировать и выслать код авторизации.
        False если время еще не пришло
        """
        if self.status != self.StatusChoice.ACTIVE:
            return False
        if not self.password_valid_until or datetime.now() > self.password_valid_until:
            return True
        return False

    def get_password(self) -> int:
        """
        Генерирует код авторизации, сохраняет его в DB и возвращает.
        Устанавливает время, после которого можно повторить данный метод.
        :return: new password
        """
        password = randint(100000, 999999)
        self.set_password(str(password))
        self.password_valid_until = datetime.now() + timedelta(minutes=self.PASSWORD_VALID_MINUTES)
        self.save()
        return password

    def time_for_password(self) -> int:
        """Возвращает количество секунд до повторной отправки пароля"""
        return int((self.password_valid_until - datetime.now()).total_seconds())

    class Meta:
        db_table = 'users'


class Desk(Model):
    """Набор карточек для изучения"""

    class AccessChoice(TextChoices):
        """
        Определяет кому доступна колода.
        Возможно будет расширенно GROUP или др.
        """
        PRIVATE = 'private'
        PUBLIC = 'public'

    name = CharField(max_length=50, db_index=True)
    description = CharField(max_length=255, blank=True, default='')
    owner = ForeignKey(User, related_name='desk_owner', on_delete=SET_NULL, null=True)
    access = CharField(max_length=10, choices=AccessChoice.choices, default=AccessChoice.PRIVATE)
    users = ManyToManyField(User, related_name='desks', blank=True)

    class Meta:
        ordering = ('name',)
        db_table = 'desks'

    def __str__(self):
        return f'{self.id} {self.owner} {self.name}'


class Card(Model):
    """
    Карточка: side_one - вопрос, side_two - ответ, возможно реверсивное использование.
    Если User.auto_translate == True - вторая сторона переводиться автоматически.
    Если User.auto_sound == True - вторая сторона озвучивается автоматически.
    """
    desk = ForeignKey(Desk, related_name='cards', on_delete=CASCADE)
    side_one = CharField(max_length=255, blank=True, default='')
    side_two = CharField(max_length=255, blank=True, default='')
    media = FileField(upload_to='cards', blank=True, default='')

    MEDIA_PATH = 'media/cards/'

    class Meta:
        ordering = ('side_one',)
        db_table = 'cards'


class LearningProgress(Model):
    """
    Хранит шаг обучения, и когда карточка может быть показана пользователю в следующий раз.
    При self.next_show_in == None карточка доступна сейчас.
    В случае правильно ответа self.step увеличивается, тем самым увеличивая временной интервал до следующего
    показа карточки. User.learning_speed - аналогичный параметр, влияющий на время показа в общем.
    Расчет следующего времени показа производиться на фронт-энде.
    """
    user = ForeignKey(User, related_name='learning_progress', on_delete=CASCADE)
    card = ForeignKey(Card, related_name='learning_progress', on_delete=CASCADE)
    next_show_in = DateTimeField(null=True, blank=True)
    step = PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = 'learning_progress'
        unique_together = ('user', 'card')


class ApiStat(Model):
    """Класс для сбора статистики по запросам в мидлваре"""
    request = CharField(max_length=128)
    time = FloatField()
