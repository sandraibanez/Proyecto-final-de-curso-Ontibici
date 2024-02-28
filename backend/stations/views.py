from django.shortcuts import render
from django.http.response import JsonResponse
from django.http import HttpResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework import viewsets
from django.urls import reverse
from rest_framework.response import Response
from .models import Stations
from .models import Bicis 
from .models import Slot
from .serializers import SlotSerializer
from .serializers import BicisSerializer
from .serializers import StationsSerializer
from rest_framework.decorators import api_view

class StationsView(viewsets.GenericViewSet):

    
    def getStations(self, request):
        stations = Stations.objects.all()
        stations_serializer = StationsSerializer(stations, many=True)
        return Response(stations_serializer.data)
    
    def getOneStation(self, request, slug):
        station = Stations.objects.get(slug=slug)
        station_serializer = StationsSerializer(station)
        return Response(station_serializer.data)

    def post(self, request):
        station = request.data.get('station')
        serializer = StationsSerializer(data=station)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        if (request.data.get('slot')):
            slots = request.data.get('slot')
            slot_station = {'station_id': serializer.data['id']}
            for i in range(slots['num_slots']):
                SlotSerializer.create(context=slot_station, number=i)
        return Response(serializer.data)

    def put(self, request, slug):
        station = Stations.objects.get(slug=slug)
        data = request.data.get('station')
        serializer = StationsSerializer(instance=station, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, slug):
        station = Stations.objects.get(slug=slug)
        station.delete()
        return Response({'data': 'Station deleted successfully'})

class BicisView(viewsets.GenericViewSet):

    def getBicis(self, request, slug=None):
        bicis = Bicis.objects.all()
        bicis_serializer = BicisSerializer(bicis, many=True)
        return Response(bicis_serializer.data)

    def getOneBicis(self, request, slug):
        bicis = Bicis.objects.get(slug=slug)
        bicis_serializer = BicisSerializer(bicis)
        return Response(bicis_serializer.data)

    def post(self, request):
        bici = request.data.get('bici')
        serializer = BicisSerializer(data=bici)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    def put(self, request, slug):
        bici = Bicis.objects.get(slug=slug)
        data = request.data.get('bici')
        serializer = BicisSerializer(bici, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        slot = request.data.get('slot')
        if (slot):
            if slot['id'] is not None:
                slot_context = {'bicis_id': bici.id, 'status': 'vacant'}
                saved_slot = Slot.objects.get(pk=slot['id'])
                SlotSerializer.update(instance=saved_slot, context=slot_context)

        return Response(serializer.data)

    def delete(self, request, slug):
        bicis = Bicis.objects.get(slug=slug)
        bicis.delete()
        return Response({'data': 'Bicis deleted successfully'})


class SlotView(viewsets.GenericViewSet):


    def getSlots(self, request):
        if request.GET.get('stations_id') is not None:
            slots = Slot.objects.filter(stations_id=request.GET.get('stations_id'))
        else:
            slots = Slot.objects.all()
        serializer = SlotSerializer(slots, many=True)
        return Response(serializer.data)

    def getOneSlot(self, request, id):
        slot = Slot.objects.all(pk=id)
        slot_serializer = SlotSerializer(slot)
        return Response(slot_serializer.data)
