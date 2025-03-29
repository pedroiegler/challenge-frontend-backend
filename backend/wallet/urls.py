from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from wallet.views import CustomTokenObtainPairView

from .views import TransactionAPIView, UserViewSet, WalletViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"wallet", WalletViewSet, basename="wallet")

urlpatterns = [
    path("", include(router.urls)),
    path("transaction/", TransactionAPIView.as_view(), name="transaction"),
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="jwt_obtain_pair"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="jwt_refresh"),
]
