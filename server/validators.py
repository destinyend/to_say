from abc import ABC, abstractmethod
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


class AbstractValidator(ABC):
    @abstractmethod
    def is_valid(self, *args, **kwargs):
        pass


class UsernameValidator(AbstractValidator):
    @staticmethod
    def is_valid(username):
        try:
            validate_email(username)
        except ValidationError:
            return False
        return True










