import os
from decimal import Decimal

import django
from django.contrib.auth.models import Group, User
from django.utils.timezone import now

from wallet.models import Transaction, Wallet

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "financial_project.settings")
django.setup()

admin_group, created = Group.objects.get_or_create(name="admin")
cliente_group, created = Group.objects.get_or_create(name="cliente")

admin_user, created = User.objects.get_or_create(
    username="admin_demo",
    defaults={"email": "admin@example.com", "is_staff": True, "is_superuser": True},
)
admin_user.set_password("admin123")
admin_user.groups.add(admin_group)
admin_user.save()


client1, created = User.objects.get_or_create(
    username="cliente1",
    defaults={
        "email": "cliente1@example.com",
        "is_staff": False,
        "is_superuser": False,
    },
)
client1.set_password("cliente123")
client1.groups.add(cliente_group)
client1.save()


client2, created = User.objects.get_or_create(
    username="cliente2",
    defaults={
        "email": "cliente2@example.com",
        "is_staff": False,
        "is_superuser": False,
    },
)
client2.set_password("cliente123")
client2.groups.add(cliente_group)
client2.save()


wallet_admin, created = Wallet.objects.get_or_create(user=admin_user)
if created or wallet_admin.balance == Decimal("0.00"):
    wallet_admin.balance = Decimal("1000.00")
    wallet_admin.save()

wallet_client1, created = Wallet.objects.get_or_create(user=client1)
if created or wallet_client1.balance == Decimal("0.00"):
    wallet_client1.balance = Decimal("500.00")
    wallet_client1.save()

wallet_client2, created = Wallet.objects.get_or_create(user=client2)
if created or wallet_client2.balance == Decimal("0.00"):
    wallet_client2.balance = Decimal("200.00")
    wallet_client2.save()


Transaction.objects.create(
    sender=wallet_client1,
    receiver=wallet_client2,
    amount=Decimal("50.00"),
    created_at=now(),
)

print("Database successfully populated!")
