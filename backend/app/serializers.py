from rest_framework import serializers

from .models import *


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class TikTakToeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TikTakToe
        fields = '__all__'


class TikTakToeCurrentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TikTakToe
        fields = ['board', 'nickname', 'winner', 'turn']
