from django.urls import path, include
from wallet.views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='jwt_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='jwt_refresh'),
]