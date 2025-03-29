from decimal import Decimal

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Transaction


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        data['id'] = user.id
        data['username'] = user.username
        data['email'] = user.email
        data['first_name'] = user.first_name
        data['last_name'] = user.last_name
        data['date_joined'] = user.date_joined
        
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'is_active', 'date_joined']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class DepositSerializer(serializers.Serializer):
    balance = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'))

class TransferSerializer(serializers.Serializer):
    receiver_id = serializers.IntegerField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'))

class TransactionSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.user.username', read_only=True)
    receiver_name = serializers.CharField(source='receiver.user.username', read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'created_at', 'sender', 'receiver', 'sender_name', 'receiver_name']
