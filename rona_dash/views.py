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
from .data import clean_down_csv, array, date_array, province_list, max_total_confirmed_count, death_array, max_total_death_count, world_df, us_df, state_df, confirmed_us, death_us, world_df_list, getConfirmedByState


confirmed = [{
    'name':'Global',
    'value': world_df_list[0],
},{
    'name':'US',
    'value': confirmed_us[0],
}]
deaths = [{
    'name':'Global',
    'value': world_df_list[1],
},{
    'name':'US',
    'value': death_us[0],
}]

@api_view(['GET'])
def overview(request):
    clean_down_csv()
    api = {
        'world_df': world_df,
        'us_df': us_df,
        'state_df': state_df,
        'confirmed_global_us': confirmed,
        'deaths_global_us': deaths,
    }
    return Response(api)

@api_view(['GET'])
def dynamic(request):
    api = {
        'list_of_daily_confirmed_record_by_state': array,
        'date_array': date_array,
        'province_list': province_list.Province_State,
        'max_total_confirmed_count_list': max_total_confirmed_count,
        'list_of_daily_death_record_by_state': death_array,
        'max_total_death_count_list': max_total_death_count
    }
    return Response(api)

@api_view(['GET'])
def detail(request, state):
    data = getConfirmedByState(state)
    api = {
        'period': data['period'],
        'confirmed': data['confirmed'],
        'deaths': data['deaths'],
    }
    return Response(api)
