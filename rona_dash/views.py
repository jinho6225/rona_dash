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
from .data import array, date_array, province_list, max_total_confirmed_count, death_array, max_total_death_count


@api_view(['GET'])
def overview(request):
    api = {
        'list_of_daily_confirmed_record_by_state': array,
        'date_array': date_array,
        'province_list': province_list.Province_State,
        'max_total_confirmed_count_list': max_total_confirmed_count,
        'list_of_daily_death_record_by_state': death_array,
        'max_total_death_count_list': max_total_death_count
    }
    return Response(api)
