from datetime import timedelta
from decimal import Decimal

import pytest
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from wallet.models import Transaction, Wallet
from wallet.signals import create_wallet_for_new_user


@pytest.mark.django_db
def test_balance_view():
    post_save.disconnect(create_wallet_for_new_user, sender=User)

    user = User.objects.create_user(username="testuser", password="password123")
    wallet = Wallet.objects.create(user=user, balance=Decimal("100.0"))

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION="Bearer " + access_token)

    response = client.get(f"/api/v1/wallet/balance/{user.id}/")

    assert response.status_code == status.HTTP_200_OK

    response_data = response.json()

    assert response_data["user_id"] == user.id
    assert response_data["username"] == user.username
    assert response_data["wallet_id"] == wallet.id
    assert str(response_data["balance"]) == str(wallet.balance)
    assert float(response_data["balance"]) == float(wallet.balance)

    post_save.connect(create_wallet_for_new_user, sender=User)


@pytest.mark.django_db
def test_balance_user_not_found():
    post_save.disconnect(create_wallet_for_new_user, sender=User)

    user = User.objects.create_user(username="testuser", password="password123")

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION="Bearer " + access_token)

    # Fazendo a requisição GET para o endpoint com um usuário inexistente
    response = client.get("/wallet/balance/999/")

    assert response.status_code == status.HTTP_404_NOT_FOUND

    post_save.connect(create_wallet_for_new_user, sender=User)


@pytest.mark.django_db
def test_balance_wallet_not_found():
    post_save.disconnect(create_wallet_for_new_user, sender=User)

    user = User.objects.create_user(username="testuser", password="password123")

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION="Bearer " + access_token)

    # Fazendo a requisição GET para o endpoint para um usuário sem carteira
    response = client.get(f"/wallet/balance/{user.id}/")

    assert response.status_code == status.HTTP_404_NOT_FOUND

    post_save.connect(create_wallet_for_new_user, sender=User)


@pytest.mark.django_db
def test_transaction_view_no_filters():
    post_save.disconnect(create_wallet_for_new_user, sender=User)

    user1 = User.objects.create_user(username="testuser1", password="password123")
    user2 = User.objects.create_user(username="testuser2", password="password123")

    sender_wallet = Wallet.objects.create(user=user1, balance=Decimal("100.0"))
    receiver_wallet = Wallet.objects.create(user=user2, balance=Decimal("50.0"))

    transaction_1 = Transaction.objects.create(
        sender=sender_wallet,
        receiver=receiver_wallet,
        amount=20,
        created_at=timezone.now(),
    )
    transaction_2 = Transaction.objects.create(
        sender=sender_wallet,
        receiver=receiver_wallet,
        amount=40,
        created_at=timezone.now() - timedelta(days=1),
    )

    refresh = RefreshToken.for_user(user1)
    access_token = str(refresh.access_token)

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION="Bearer " + access_token)

    response = client.get("/api/v1/transaction/")

    assert response.status_code == status.HTTP_200_OK

    response_data = response.json()

    assert len(response_data) == 2
    assert float(response_data[0]["amount"]) == 20.00
    assert float(response_data[1]["amount"]) == 40.00

    post_save.connect(create_wallet_for_new_user, sender=User)
