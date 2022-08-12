import os
import threading

from django.db import connection
from django.db.models import Q
from gtts import gTTS
from google_trans_new import google_translator
from django.conf.global_settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework_simplejwt.views import TokenObtainPairView
from server.db import db
from server.tasks import voice_acting, send_code_email
from to_say.settings import BASE_DIR
from server.permissions import *
from server.serializers import *
from server.validators import UsernameValidator
from server.viewsets import *
from rest_framework.mixins import *


class UserLogin(TokenObtainPairView):
    permission_classes = (PasswordTimeValid,)
    serializer_class = UserLoginSerializer


class UsersView(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.exclude(status=User.StatusChoice.BANNED).only(*UserSerializer.Meta.fields)

    def get_permissions(self):
        if self.action in ('request_password',):
            permission_classes = (AllowAny,)
        elif self.action in ('self', 'update', 'partial_update'):
            permission_classes = (IsAuthenticated & SelfOnly,)
        else:
            permission_classes = (IsAdminUser,)
        return (permission() for permission in permission_classes)

    @action(['POST'], detail=False)
    def request_password(self, request):
        """
        Запрос кода авторизации на email
        Автоматическое создание пользователя, если он не существует
        """
        username = request.data['username']
        if not UsernameValidator.is_valid(username):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            user = User.objects.create(username=username)
        if not user.can_send_password():  # проверка возможности повторной отправки кода авторизации
            return Response(
                {'seconds': user.time_for_password()},  # возвращаем количество секунд до повторного запроса кода
                status=status.HTTP_208_ALREADY_REPORTED
            )
        password = user.get_password()  # генерация кода и задание времени повторного запроса кода авторизации
        send_code_email.delay(username, password)
        return Response({'seconds': User.PASSWORD_VALID_MINUTES * 60}, status=status.HTTP_200_OK)

    @action(['GET'], detail=False)
    def self(self, request):
        """Получение информации о текущем пользователе"""
        return Response(
            UserSerializer(request.user).data,
            status=status.HTTP_200_OK
        )


class DesksView(GenericViewSet, DestroyModelMixin, UpdateModelMixin):
    serializer_class = DeskSerializer
    queryset = Desk.objects.all()

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            permission_classes = (IsActiveUser,)
        elif self.action == 'set_is_learning':
            permission_classes = (IsActiveUser,)
        else:
            permission_classes = (IsActiveUser & IsDeskOwner,)
        return (permission() for permission in permission_classes)

    @action(['GET'], detail=False)
    def download_available_desks(self, request):
        """
        Получение массива колод доступного для текущего пользователя:
        если текущий пользователь владелец или колода выбрана для обучения
        :param request: user_id
        :return: [{id:int, name:str, description:str, access:Desk.AccessChoice, owner:int, is_learning:bool,
        cards_in_desk:int, cards_studied:int}]
        """
        sql = '''
        SELECT DISTINCT 
        desks.id, 
        name, 
        description, 
        access, 
        owner_id AS owner, 
        EXISTS(SELECT * FROM desks_users WHERE user_id = %s AND desk_id=desks.id) AS is_learning, 
        (SELECT COUNT(*) FROM cards WHERE desk_id = desks.id) AS cards_in_desk, 
        (SELECT COUNT(*) FROM learning_progress WHERE card_id IN (SELECT id FROM cards WHERE desk_id=desks.id) AND 
            (next_show_in IS NULL OR next_show_in > NOW())) AS cards_studied 
        FROM desks 
        WHERE owner_id = %s OR (access= %s AND EXISTS(SELECT * FROM desks_users WHERE user_id= %s AND desk_id=desks.id)) 
        ORDER BY name
        '''
        data = db(sql, (request.user.id, request.user.id, Desk.AccessChoice.PUBLIC, request.user.id))
        return Response(data, status=status.HTTP_200_OK)

    @action(['GET'], detail=False)
    def find(self, request):
        """
        Получение массива колод где name.startswith(text)
        :param request: request.user.id:int, request.query_params.text:str:
        :return: [{
                     id:int,
                     name:str,
                     description:str,
                     access:Desk.AccessChoice,
                     owner:int,
                     is_learning:bool,
                     cards_in_desk:int
                     }]
        """
        try:
            text = request.query_params.get('text').strip()
        except AttributeError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if not text:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        sql = '''
        SELECT DISTINCT 
        desks.id AS id , 
        name, 
        description, 
        access, 
        owner_id AS owner, 
        IF(du.id, 1, 0) AS is_learning, 
        (SELECT COUNT(*) FROM cards WHERE desk_id=desks.id) AS cards_in_desk 
        FROM desks 
        LEFT JOIN desks_users du ON desks.id = du.desk_id 
        WHERE name LIKE %s AND (owner_id=%s OR access=%s) 
        ORDER BY name LIMIT 100
        '''
        data = db(sql, ('%' + text + '%', request.user.id, Desk.AccessChoice.PUBLIC))
        return Response(data, status=status.HTTP_200_OK)

    @action(['PATCH'], detail=True)
    def set_is_learning(self, request, pk=None):
        desk = self.get_object()
        if request.data['is_learning']:
            desk.users.add(request.user)
        else:
            desk.users.remove(request.user)
        return Response(status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """
        создание колоды, с владельцем - текущий пользователь, добавление колоды к изучению для текущего пользователя
        :param request: data[name:str, description:str, access:Desk.AccessChoice]
        :return: {id:int, name:str, description:str, access:Desk.AccessChoice, owner:int, is_learning:bool}
        """
        name = request.data['name'].strip()
        if not name:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        d = Desk.objects.create(
            name=name,
            description=request.data['description'],
            owner=request.user,
            access=request.data['access']
        )
        if request.data['is_learning']:
            d.users.add(request.user)
        return Response(
            DeskSerializer(d).data,
            status=status.HTTP_201_CREATED
        )


class CardsView(ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all().only(*CardSerializer.Meta.fields)

    def get_permissions(self):
        if self.request.method in SAFE_METHODS or self.action == 'create':
            permission_classes = (IsActiveUser,)
        else:
            permission_classes = (IsActiveUser & IsCardOwner,)
        return (permission() for permission in permission_classes)

    @action(['GET'], detail=False)
    def load_cards_in_desks(self, request):
        """
        Получение карточек, для выбранных колод
        :param request: desk_ides:str (id1,id2,id3...)
        :return: [{
                    id:int,
                    side_one:str,
                    side_two:str,
                    desk:int,
                    lp_id:int,
                    step:int,
                    next_show_id:str
                      }]
        """

        desk_ides = request.query_params.get('ides')
        sql = f'''
        SELECT DISTINCT 
        cards.id AS id, 
        side_one, 
        side_two, 
        desk_id AS desk, 
        l.id AS lp_id, 
        l.step AS step, 
        DATE_FORMAT(l.next_show_in, "%%Y-%%m-%%d %%H:%%i:%%S") AS next_show_in, 
        media 
        FROM cards LEFT JOIN learning_progress l on cards.id = l.card_id 
        WHERE desk_id IN ({desk_ides}) 
        '''
        data = db(sql)

        return Response(
            data,
            status=status.HTTP_200_OK
        )

    def create(self, request, *args, **kwargs):
        """
        Создание карточки, генерация озвучки, если user.auto_sound == True
        :param request: {desk:int, side_one:str, side_two:str}
        :return: {
                'id':int,
                'side_one': str,
                'side_two': str,
                'desk':int,
                'media': str,
                'lp_id':int,
                'step': 0,
                'next_show_in': None
            }
        """

        card = Card.objects.create(
            desk_id=request.data['desk'],
            side_one=request.data['side_one'],
            side_two=request.data['side_two']
        )
        if request.user.auto_sound:
            voice_acting.delay(card.id)

        learning = LearningProgress.objects.create(card=card, user=request.user)

        return Response(
            {
                'id': card.id,
                'side_one': card.side_one,
                'side_two': card.side_two,
                'desk': card.desk.id,
                'media': 'creating',  # флаг указывающий клиенту, что аудиофайл создается и его нужно подгрузить
                'lp_id': learning.id,
                'step': 0,
                'next_show_in': None
            },
            status=status.HTTP_201_CREATED
        )


class LearningProgressesView(ModelViewSet):
    serializer_class = LearningProgressSerializer
    queryset = LearningProgress.objects.all()
    permission_classes = (IsActiveUser & IsLearningProgressOwner,)

    def create(self, request, *args, **kwargs):
        """Создание LearningProgress для текущего пользователя и указанной карты"""
        lp = LearningProgress.objects.create(user=request.user, **request.data)
        return Response(
            LearningProgressSerializer(lp).data,
            status=status.HTTP_201_CREATED
        )


class TranslatorView(ViewSet):
    permission_classes = (IsActiveUser,)

    @action(['GET'], detail=False)
    def en_ru(self, request):
        """Перевод с английского на русский"""
        try:
            text = request.query_params.get('text').strip()
            translator = google_translator()
            translate_text = translator.translate(text, lang_tgt='ru')
            return Response({"result": translate_text}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({"result": str(e)}, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
