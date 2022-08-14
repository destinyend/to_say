from random import randint

from django.db import IntegrityError

from server.db_generate.generators import UserGenerator, ModelGenerator, Field, CardGenerator
from server.models import User, Desk, Card, LearningProgress


def user_generate() -> [User]:
    """Генерирует возможных пользователей"""
    fields = [
        Field('status', [User.StatusChoice.BANNED, User.StatusChoice.ACTIVE]),
        Field('auto_translate', [True, False]),
        Field('auto_sound', [True, False]),
    ]
    generator = UserGenerator(User, fields)
    users = generator.generate()
    print('Users created')
    return users


SYMBOLS = """ fFыЫ!"№;%:?*()ХЪ'"<>/?`ё№$-+={}[],.^\\|"""  # набор символов для генерации текстовых полей


def generate_text(symbol: str) -> str:
    """Генерирует текстовое поле случайной длины с обязательным символом"""
    text = []
    for _ in range(randint(3, 50)):
        index = randint(0, len(SYMBOLS) - 1)
        text.append(SYMBOLS[index])
    index = randint(0, len(text) - 1)
    text[index] = symbol
    return ''.join(text)


def desks_generate(users: [User]) -> [Desk]:
    """Генерация колод, с различными типами пользователей"""
    fields = [
        Field('name', [generate_text(s) for s in SYMBOLS]),
        Field('owner', users),
        Field('access', [Desk.AccessChoice.PUBLIC, Desk.AccessChoice.PRIVATE])
    ]
    generator = ModelGenerator(Desk, fields)
    desks = generator.generate()
    print('Desks created')
    return desks


def cards_generate() -> [Card]:
    """Генерация карт с различными символами"""
    fields = [
        Field('side_one', [generate_text(s) for s in SYMBOLS][:100]),
        Field('side_two', [generate_text(s) for s in SYMBOLS][:100]),
    ]
    generator = CardGenerator(Card, fields)
    generator.generate()
    print('Cards created')


def generate_learning_progresses() -> None:
    """Генерация LearningProgress для всех типов пользователей и колод"""
    for user in User.objects.all():
        if not randint(0, 4):
            continue
        for desk in Desk.objects.all():
            if not randint(0, 4):
                continue
            for card in desk.cards.all():
                try:  # Если изначальная бд не пуста, и имеются пользователи с lp, игнорируем
                    LearningProgress.objects.create(user=user, card=card)
                except IntegrityError:
                    pass
    print('LearningProgress created')


def db_generate():
    """Создает тестовую ДБ, комбинируя возможные варианты. Будет создано около 20к различных объектов"""
    users = user_generate()
    i = int(len(users)/2) # часть пользователей не будут иметь собственных колод
    users = users[:i]
    users.append(None)  # добавляем пользователя None, для случаев когда у колоды нет владельца

    desks_generate(users)

    cards_generate()

    generate_learning_progresses()
