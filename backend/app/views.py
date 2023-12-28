from django.forms import model_to_dict
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *


class OrderAPI(APIView):
    def get(self, request, format=None):
        match request.GET["data"]:
            case "all":
                orders = Order.objects.filter(complete=False)
                serializer = OrderSerializer(orders, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            case "only":
                orders = Order.objects.get(phone=request.GET["phone"])
                serializer = OrderSerializer(orders)
                return Response(serializer.data, status=status.HTTP_200_OK)
            case "people":
                if Order.objects.filter(complete=True, phone=request.GET["phone"]).exists():
                    return Response(-1, status=status.HTTP_200_OK)
                orders = Order.objects.filter(complete=False)
                count = 0
                for order in orders:
                    if order.phone == request.GET["phone"]:
                        break
                    count += 1
                return Response(count, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        order = Order.objects.get(phone=request.data["phone"])
        order.complete = True
        order.save()
        return Response(status=status.HTTP_200_OK)


class TikTakToeAPI(APIView):
    def get(self, request, format=None):
        match request.GET["data"]:
            case "all":
                tiktaktoes = TikTakToe.objects.filter(now_playing=False)
                serializer = TikTakToeSerializer(tiktaktoes, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            case "current":
                try:
                    tiktaktoe = TikTakToe.objects.get(now_playing=True)
                    serializer = TikTakToeCurrentSerializer(tiktaktoe)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except TikTakToe.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            case "only":
                tiktaktoes = TikTakToe.objects.filter(code=request.GET["code"])
                serializer = TikTakToeSerializer(tiktaktoes, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = TikTakToeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        tiktaktoe = TikTakToe.objects.get(code=request.data["code"], now_playing=True)
        if not tiktaktoe:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializers = TikTakToeSerializer(tiktaktoe, data=request.data, partial=True)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        tiktaktoe = TikTakToe.objects.get(code=request.data["code"])
        tiktaktoe.now_playing = False
        tiktaktoe.turn = None
        tiktaktoe.save()
        return Response(status=status.HTTP_200_OK)
