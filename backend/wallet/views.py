from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from wallet.serializers import CustomTokenObtainPairSerializer

from .models import Transaction, Wallet
from .serializers import (
    DepositSerializer,
    TransactionSerializer,
    TransferSerializer,
    UserSerializer,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ["create"]:
            return [AllowAny()]
        return [IsAuthenticated()]


class WalletViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, url_path=r"balance/(?P<id_user>\d+)", methods=["GET"])
    def balance(self, request, id_user):
        try:
            user = User.objects.get(id=id_user)
            wallet = Wallet.objects.get(user=user)

            response = {
                "user_id": user.id,
                "username": user.username,
                "wallet_id": wallet.id,
                "balance": wallet.balance,
            }

            return Response(response, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response(
                {"detail": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Wallet.DoesNotExist:
            return Response(
                {"detail": "Wallet not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=False, url_path=r"deposit/(?P<id_user>\d+)", methods=["PATCH"])
    def deposit(self, request, id_user):
        serializer = DepositSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = User.objects.get(id=id_user)
                wallet = Wallet.objects.get(user=user)
                balance = serializer.validated_data["balance"]

                wallet.balance += balance
                wallet.save()

                return Response(
                    {
                        "message": "Balance added successfully!",
                        "new_balance": wallet.balance,
                    },
                    status=status.HTTP_200_OK,
                )

            except User.DoesNotExist:
                return Response(
                    {"detail": "User not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            except Wallet.DoesNotExist:
                return Response(
                    {"detail": "Wallet not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        detail=False,
        url_path=r"transfer/(?P<id_user_sender>\d+)",
        methods=["POST"],
    )
    def transfer(self, request, id_user_sender):
        serializer = TransferSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(id=id_user_sender)
                sender_wallet = Wallet.objects.get(user=user)
                receiver_wallet = Wallet.objects.get(
                    user_id=serializer.validated_data["receiver_id"]
                )
                amount = serializer.validated_data["amount"]

                if sender_wallet.balance < amount:
                    return Response(
                        {"error": "Insufficient balance!"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                with transaction.atomic():
                    Transaction.objects.create(
                        sender=sender_wallet,
                        receiver=receiver_wallet,
                        amount=amount,
                    )

                return Response(
                    {
                        "message": "Transfer completed successfully!",
                        "sender_balance": sender_wallet.balance,
                        "receiver_balance": receiver_wallet.balance,
                    },
                    status=status.HTTP_200_OK,
                )

            except User.DoesNotExist:
                return Response(
                    {"detail": "User not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            except Wallet.DoesNotExist:
                return Response(
                    {"detail": "Wallet not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionAPIView(APIView):
    def get(self, request):
        transactions = Transaction.objects.all()

        sender_id = request.query_params.get("sender_id", None)
        sender_name = request.query_params.get("sender_name", None)
        created_at_after = request.query_params.get("created_at_after", None)
        created_at_before = request.query_params.get("created_at_before", None)

        if sender_id:
            transactions = transactions.filter(
                sender__user__id__iexact=sender_id
            )

        if sender_name:
            transactions = transactions.filter(
                sender__user__username__icontains=sender_name
            )

        if created_at_after:
            transactions = transactions.filter(created_at__gte=created_at_after)

        if created_at_before:
            transactions = transactions.filter(created_at__lte=created_at_before)

        serializer = TransactionSerializer(transactions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
