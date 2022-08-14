from django.core.management import BaseCommand

from server.db_generate.db_generate import db_generate


class Command(BaseCommand):
    help = 'Наполнение базы произвольными данными. ' \
           'Предназначено для тестирования. Процесс длительный, комбинирует' \
           'множество возможных вариантов'

    def handle(self, *args, **kwargs):
        db_generate()
        self.stdout.write("Job done!")
