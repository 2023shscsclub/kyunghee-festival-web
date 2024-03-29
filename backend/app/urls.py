from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import *

urlpatterns = [
    path('orders/', OrderAPI.as_view()),
    path('tiktaktoe/', TikTakToeAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
