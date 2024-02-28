from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from core.permissions import IsAdmin
from .models import Incidenceslot,Incidencebici,Incidencestation
from .serializers import IncidenceslotSerializer,IncidenceSerializerstation,IncidenceSerializerbici,NotificationSerializer
from users.models import User

class IncidenceslotView(viewsets.GenericViewSet):

    def getIncidents(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceslotSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        user = User.objects.get(username=username)
        incidentsslot = Incidenceslot.objects.filter(user_id=user.id)
        incidents_serializerslot = IncidenceslotSerializer(incidentsslot, many=True)
        return Response(incidents_serializerslot.data)

    def post_slot(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceslotSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        data = request.data['slot_incidence']

        serializer_context = {
            'username': username,
            'slot_id': data['slot_id'],
            'title': data['title'],
            'desc': data['desc'],
        }

        incidenceslot = IncidenceslotSerializer.createslot(context=serializer_context)
        return Response(IncidenceslotSerializer.to_incidence_slot(incidenceslot))

class IncidencebiciView(viewsets.GenericViewSet):

    def getIncidents(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceslotSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        user = User.objects.get(username=username)
        incidentsbici = Incidencebici.objects.filter(user_id=user.id)
        incidents_serializerbici = IncidenceSerializerbici(incidentsbici, many=True)
        return Response(incidents_serializerbici.data)

    
    def post_bici(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceSerializerbici.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        data = request.data['bici_incidence']

        serializer_context = {
            'username': username,
            'bici_id': data['bici_id'],
            'title': data['title'],
            'desc': data['desc'],
        }

        incidencebici = IncidenceSerializerbici.createbici(context=serializer_context)
        return Response(IncidenceSerializerbici.to_incidence_bici(incidencebici))
    
class IncidencestationView(viewsets.GenericViewSet):

    def getIncidents(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceslotSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        user = User.objects.get(username=username)
        incidentsstation = Incidencestation.objects.filter(user_id=user.id)
        incidents_serializerstation = IncidenceSerializerstation(incidentsstation, many=True)
        return Response(incidents_serializerstation.data)

    def post_station(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceslotSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        data = request.data['station_incidence']

        serializer_context = {
            'username': username,
            'station_id': data['station_id'],
            'title': data['title'],
            'desc': data['desc'],
        }

        Incidencestation = IncidenceSerializerstation.createstation(context=serializer_context)
        return Response(IncidenceSerializerstation.to_incidence_station(Incidencestation))

class IncidentsView(viewsets.GenericViewSet):

    def getAllIncidentsSlots(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceslotSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[2]
        if username == "admin":
            incidents_slots = Incidenceslot.objects.all()
            incidents_slots_serializer = IncidenceslotSerializer(incidents_slots, many=True)
        return Response(incidents_slots_serializer.data)
    
    def getAllIncidentsbicis(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceSerializerbici.usertoken(
        context=serializer_context_user)
        username = serializer_user[2]
        if username == "admin":
            incidents_bici = Incidencebici.objects.all()
            incidents_bici_serializer = IncidenceSerializerbici(incidents_bici, many=True)
        return Response(incidents_bici_serializer.data)

    def getAllIncidentsstations(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceslotSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[2]
        if username == "admin":
            incidents_stations = Incidencestation.objects.all()
            incidents_station_serializer = IncidenceSerializerstation(incidents_stations, many=True)
        return Response(incidents_station_serializer.data)
    
    def updateIncidenceSlot(self, request, id):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceslotSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[2]
        if username == "admin":
            context = request.data
            incidence = IncidenceslotSerializer.updateStatus(id, context)
        return Response(IncidenceslotSerializer.to_incidence_slot(incidence))
    
    def updateIncidencebici(self, request, id):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceSerializerbici.usertoken(
        context=serializer_context_user)
        username = serializer_user[2]
        if username == "admin":
            context = request.data
            incidence = IncidenceSerializerbici.updateStatus(id, context)
        return Response(IncidenceSerializerbici.to_incidence_bici(incidence))

    def updateIncidencestation(self, request, id):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = IncidenceSerializerstation.usertoken(
        context=serializer_context_user)
        username = serializer_user[2]
        if username == "admin":
            context = request.data
            print (context)
            incidence = IncidenceSerializerstation.updateStatus(id, context)
        return Response(IncidenceSerializerstation.to_incidence_station(incidence))

    def deleteIncidenceslot(self, request, id):
        incidence_slot = Incidenceslot.objects.get(id=id)
        incidence_slot.delete()
        return Response({'data': 'Incidence deleted successfully'})
    
    def deleteIncidencebici(self, request, id):
        incidence_slot = Incidencebici.objects.get(id=id)
        incidence_slot.delete()
        return Response({'data': 'Incidence deleted successfully'})
    
    def deleteIncidencestation(self, request, id):
        incidence_slot = Incidencestation.objects.get(id=id)
        incidence_slot.delete()
        return Response({'data': 'Incidence deleted successfully'})
    
class NotificationsView(viewsets.GenericViewSet):

    def get(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = NotificationSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        notifications_serializer = NotificationSerializer.getUserNotification(username)
        notifications = NotificationSerializer(notifications_serializer, many=True)
        return Response(notifications.data)

    def seenNotification(self, request, id):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = NotificationSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        serializer_context = { 'username': username, 'id': id }
        serializer = NotificationSerializer.seeNotification(context=serializer_context)
        return Response(NotificationSerializer.to_notification(serializer))
