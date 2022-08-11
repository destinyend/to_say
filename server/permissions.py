from datetime import datetime

from rest_framework.permissions import *

from server.models import User


class PasswordTimeValid(BasePermission):
    def has_permission(self, request, view):
        return User.objects.filter(username=request.data['username'], password_valid_until__gt=datetime.now()).exists()


class SelfOnly(BasePermission):
    """Предоставляет доступ к изменению только для текущего пользователя"""
    def has_object_permission(self, request, view, obj):
        return obj == request.user


class IsActiveUser(BasePermission):
    """Предоставляет доступ только для активного пользователя"""
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.status == User.StatusChoice.ACTIVE

    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and request.user.status == User.StatusChoice.ACTIVE


class IsDeskOwner(BasePermission):
    """Предоставляет права на изменение только владельцу колоды"""
    def has_object_permission(self, request, view, obj):
        return obj.owner and request.user.id == obj.owner.id


class IsCardOwner(BasePermission):
    """Предоставляет права на изменение карты только владельцу колоды"""
    def has_object_permission(self, request, view, obj):
        return obj.desk.owner and request.user.id == obj.desk.owner.id


class IsLearningProgressOwner(BasePermission):
    """Предоставляет права на изменение LearningProgress только владельцу"""
    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.user.id


