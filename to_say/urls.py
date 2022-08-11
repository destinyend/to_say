from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import include, path
from server import views
from django.conf.urls.static import static

from server.views import UserLogin
from to_say import settings

router = DefaultRouter()
for name in views.__dict__:
    if name.endswith('View') and name not in ('APIView', 'ViewSet', 'TokenObtainPairView'):
        url = name.replace('View', '').lower()
        router.register(url, getattr(views, name), basename=url)


urlpatterns = [
    path('', include(router.urls)),
    path('token_obtain/', UserLogin.as_view(), name='token_obtain_pair'),
    path('refresh_token/', TokenRefreshView.as_view(), name='token_refresh')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
