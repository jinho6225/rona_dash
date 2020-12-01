from django.urls import path
from . import views
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('overview/', views.overview, name="overview"),
    path('dynamic/', views.dynamic, name="dynamic"),
    path('detail/<str:state>', views.detail, name="detail"),

]