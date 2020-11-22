from django.urls import path
from . import views
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.apiOverview, name="api_overview"),
    # path('post-list/', views.PostList.as_view(), name="task-list"),
    # path('post-detail/<int:pk>', views.post_list, name="task-list"),

]