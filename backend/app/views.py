from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *


class OrderAPI(APIView):
    def get(self, request, format=None):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        Order.objects.filter(name=request.data["name"]).delete()


class TikTakToeAPI(APIView):
    def get(self, request, format=None):
        tiktaktoes = TikTakToe.objects.all()
        serializer = TikTakToeSerializer(tiktaktoes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = TikTakToeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        tiktaktoe = TikTakToe.objects.get(code=request.data["code"])
        serializers = TikTakToeSerializer(tiktaktoe, data=request.data, partial=True)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        tiktaktoe = TikTakToe.objects.get(code=request.data["code"])
        tiktaktoe.current_playing = False
        tiktaktoe.save()
        return Response(status=status.HTTP_200_OK)
