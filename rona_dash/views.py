from django.shortcuts import render, get_object_or_404, redirect

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status
from .data import totals_df, countries_df


@api_view(['GET'])
def apiOverview(request):
    # a = data.totals_df
    # print(a)
    api = {
        'Total': totals_df,
        'TotalByCountry': countries_df
    }
    return Response(api)
