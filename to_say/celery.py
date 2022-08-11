import os

from celery.app import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'to_say.settings')

app = Celery('quick_publisher')
app.config_from_object('django.conf:settings')


app.autodiscover_tasks()
