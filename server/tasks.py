import os

from django.core.mail import send_mail
from django.template.loader import render_to_string
from gtts import gTTS
from server.models import Card, User
from to_say.celery import app
from to_say.settings import BASE_DIR, EMAIL_HOST_USER


@app.task
def voice_acting(card_id):
    card = Card.objects.get(id=card_id)
    try:
        gtts = gTTS(text=card.side_one, lang='en', slow=False)
        file = f'{card.id}.mp3'
        gtts.save(os.path.join(BASE_DIR, Card.MEDIA_PATH, file))
        card.media = file
        card.save()
    except Exception as e:
        print(e)


@app.task
def send_code_email(email, password):
    html_message = render_to_string(
        os.path.join(BASE_DIR, 'templates/email.html'),
        {'code': password, 'valid_minutes': User.PASSWORD_VALID_MINUTES}
    )

    send_mail(
        'Ваш код доступа 2say',
        html_message,
        EMAIL_HOST_USER,
        [email],
        html_message=html_message
    )
