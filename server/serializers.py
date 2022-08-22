from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from server.models import User, Desk, Card, LearningProgress
import secrets
import string


def create_model_serializer(model_name: str) -> type:
    """Метакласс создающий сериалайзеры по имени модели"""
    meta = type('Meta', (object,), {'fields': '__all__', 'model': globals()[model_name]})
    args = {'Meta': meta}
    return type(f'{model_name}Serializer', (ModelSerializer,), args)


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


class DeskSerializer(create_model_serializer('Desk')):
    is_learning = SerializerMethodField()

    def get_is_learning(self, desk):
        return Desk.objects.filter(id=desk.id, users__id=self.context.get('user_id')).exists()


CardSerializer = create_model_serializer('Card')

LearningProgressSerializer = create_model_serializer('LearningProgress')
