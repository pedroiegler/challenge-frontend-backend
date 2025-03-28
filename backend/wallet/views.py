from rest_framework_simplejwt.views import TokenObtainPairView
from wallet.serializers import CustomTokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import Wallet, Transaction

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [AllowAny()]
        return [IsAuthenticated()]

class WalletViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, url_path=r'balance/(?P<id_user>\d+)', methods=['GET'])
    def balance(self, request, id_user):
        try:
            user = User.objects.get(id=id_user)
            wallet = Wallet.objects.get(user=user)

            response = {
                'user_id': user.id,
                'username': user.username,
                'wallet_id': wallet.id,
                'balance': wallet.balance
            }

            return Response(response, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
        except Wallet.DoesNotExist:
            return Response({'detail': 'Wallet not found'}, status=status.HTTP_404_NOT_FOUND)