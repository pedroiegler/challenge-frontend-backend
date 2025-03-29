from decimal import Decimal

import pytest
from django.contrib.auth.models import User
from django.db.models.signals import post_save

from wallet.models import Transaction, Wallet
from wallet.signals import create_wallet_for_new_user


@pytest.mark.django_db
def test_wallet_creation():
    post_save.disconnect(create_wallet_for_new_user, sender=User)
    
    user = User.objects.create_user(username="testuser", password="password123")
    
    wallet = Wallet.objects.create(user=user, balance=Decimal('100.00'))
    
    assert wallet.user.username == "testuser"
    assert wallet.balance == Decimal('100.00')

    post_save.connect(create_wallet_for_new_user, sender=User)

@pytest.mark.django_db
def test_wallet_transaction_creation():
    post_save.disconnect(create_wallet_for_new_user, sender=User)
    
    user1 = User.objects.create_user(username="testuser1", password="password123")
    user2 = User.objects.create_user(username="testuser2", password="password456")
    
    wallet1 = Wallet.objects.create(user=user1, balance=Decimal('100.00'))
    wallet2 = Wallet.objects.create(user=user2, balance=Decimal('50.00'))
    
    transaction = Transaction.objects.create(
        sender=wallet1,
        receiver=wallet2,
        amount=Decimal('30.00')
    )
    
    assert transaction.sender == wallet1
    assert transaction.receiver == wallet2
    assert transaction.amount == Decimal('30.00')

    wallet1.refresh_from_db()
    wallet2.refresh_from_db()

    assert wallet1.balance == Decimal('70.00') 
    assert wallet2.balance == Decimal('80.00')

    post_save.connect(create_wallet_for_new_user, sender=User)