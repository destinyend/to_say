"""Декораторы методов для тестов. Позволяют выполнить серию запросов выбранного типа"""
from server.models import User
from server.tests.mixins.abstract import UserGetter


def total_users_and_none(func):
    def wrapper(self):
        for user in UserGetter():
            func(self, user)
    return wrapper


def total_users(func):
    def wrapper(self):
        for user in UserGetter():
            if user.id:
                func(self, user)
    return wrapper


def no_auth_user(func):
    def wrapper(self, **kwargs):
        for user in UserGetter():
            if not user.id:
                func(self, user, **kwargs)
    return wrapper


def banned_users(func):
    def wrapper(self):
        for user in UserGetter():
            if user.status == User.StatusChoice.BANNED:
                func(self, user)
    return wrapper


def active_users(func):
    def wrapper(self):
        for user in UserGetter():
            if user.status == User.StatusChoice.ACTIVE:
                func(self, user)
    return wrapper


def no_auth_and_banned_users(func):
    def wrapper(self):
        for user in UserGetter():
            if user.status == User.StatusChoice.ACTIVE or not user.id:
                func(self, user)
    return wrapper






