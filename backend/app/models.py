from django.db import models


class Order(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    drink = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name + "" + self.drink
