from abc import ABC

from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from server.models import User, Desk, Card, LearningProgress
import secrets
import string


class UserLoginSerializer(TokenObtainPairSerializer):
    def _set_password(self):
        alphabet = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(alphabet) for _ in range(20))
        self.user.set_password(password)
        self.user.password_valid_until = None
        self.user.save()

    def validate(self, attrs):
        data = super().validate(attrs)
        self._set_password()
        return data


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'auto_translate', 'auto_sound', 'learning_speed', 'learning_mode',
                  'sound_on')


class DeskSerializer(ModelSerializer):
    is_learning = SerializerMethodField()

    def get_is_learning(self, desk):
        return Desk.objects.filter(id=desk.id, users__id=self.context.get('user_id')).exists()

    class Meta:
        model = Desk
        fields = ('id', 'name', 'description', 'access', 'owner', 'is_learning')


class CardSerializer(ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'side_one', 'side_two', 'desk', 'media')


class LearningProgressSerializer(ModelSerializer):
    class Meta:
        model = LearningProgress
        fields = ('id', 'next_show_in', 'step')
