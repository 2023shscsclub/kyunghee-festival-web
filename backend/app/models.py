from django.db import models


class Order(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100, unique=True)
    drink = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name + "" + self.drink


class TikTakToe(models.Model):
    code = models.IntegerField(unique=True)
    board = models.JSONField(default=list)
    nickname = models.CharField(max_length=100, null=True)
    winner = models.CharField(max_length=100, null=True)
    now_playing = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.nickname is None:
            return self.code
        else:
            return self.code + " " + self.nickname
