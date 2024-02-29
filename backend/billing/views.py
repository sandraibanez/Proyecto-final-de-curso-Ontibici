from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from core.permissions import IsAdmin
from .models import Billing
from .serializers import BillingSerializer
from users.models import User

class BillingView(viewsets.GenericViewSet):

    def getBilling(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = BillingSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        user = User.objects.get(username=username)
        billing = Billing.objects.filter(user_id=user.id)
        billing_serializer = BillingSerializer(billing, many=True)
        return Response(billing_serializer.data)

    def postbilling(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = BillingSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        data = request.data['billing_create']

        serializer_context = {
            'username': username,
            'pay': data['pay'],
            'rent_id': data['rent_id']
        }

        billing = BillingSerializer.billing(context=serializer_context)
        return Response(BillingSerializer.to_billing(billing))


# class IncidentsView(viewsets.GenericViewSet):

#     def getAllIncidentsSlots(self, request):
#         bearer = request.headers['Authorization'].split()
#         serializer_context_user = {
#             'token': bearer[1]
#         }
#         serializer_user = IncidenceslotSerializer.usertoken(
#         context=serializer_context_user)
#         username = serializer_user[2]
#         if username == "admin":
#             incidents_slots = Incidenceslot.objects.all()
#             incidents_slots_serializer = IncidenceslotSerializer(incidents_slots, many=True)
#         return Response(incidents_slots_serializer.data)
    
#     def getAllIncidentsbicis(self, request):
#         bearer = request.headers['Authorization'].split()
#         serializer_context_user = {
#             'token': bearer[1]
#         }
#         serializer_user = IncidenceSerializerbici.usertoken(
#         context=serializer_context_user)
#         username = serializer_user[2]
#         if username == "admin":
#             incidents_bici = Incidencebici.objects.all()
#             incidents_bici_serializer = IncidenceSerializerbici(incidents_bici, many=True)
#         return Response(incidents_bici_serializer.data)

#     def getAllIncidentsstations(self, request):
#         bearer = request.headers['Authorization'].split()
#         serializer_context_user = {
#             'token': bearer[1]
#         }
#         serializer_user = IncidenceslotSerializer.usertoken(
#         context=serializer_context_user)
#         username = serializer_user[2]
#         if username == "admin":
#             incidents_stations = Incidencestation.objects.all()
#             incidents_station_serializer = IncidenceSerializerstation(incidents_stations, many=True)
#         return Response(incidents_station_serializer.data)
    
#     def updateIncidenceSlot(self, request, id):
#         bearer = request.headers['Authorization'].split()
#         serializer_context_user = {
#             'token': bearer[1]
#         }
#         serializer_user = IncidenceslotSerializer.usertoken(
#         context=serializer_context_user)
#         username = serializer_user[2]
#         if username == "admin":
#             context = request.data
#             incidence = IncidenceslotSerializer.updateStatus(id, context)
#         return Response(IncidenceslotSerializer.to_incidence_slot(incidence))
    
#     def updateIncidencebici(self, request, id):
#         bearer = request.headers['Authorization'].split()
#         serializer_context_user = {
#             'token': bearer[1]
#         }
#         serializer_user = IncidenceSerializerbici.usertoken(
#         context=serializer_context_user)
#         username = serializer_user[2]
#         if username == "admin":
#             context = request.data
#             incidence = IncidenceSerializerbici.updateStatus(id, context)
#         return Response(IncidenceSerializerbici.to_incidence_bici(incidence))

#     def updateIncidencestation(self, request, id):
#         bearer = request.headers['Authorization'].split()
#         serializer_context_user = {
#             'token': bearer[1]
#         }
#         serializer_user = IncidenceSerializerstation.usertoken(
#         context=serializer_context_user)
#         username = serializer_user[2]
#         if username == "admin":
#             context = request.data
#             print (context)
#             incidence = IncidenceSerializerstation.updateStatus(id, context)
#         return Response(IncidenceSerializerstation.to_incidence_station(incidence))

#     def deleteIncidenceslot(self, request, id):
#         incidence_slot = Incidenceslot.objects.get(id=id)
#         incidence_slot.delete()
#         return Response({'data': 'Incidence deleted successfully'})
    
#     def deleteIncidencebici(self, request, id):
#         incidence_slot = Incidencebici.objects.get(id=id)
#         incidence_slot.delete()
#         return Response({'data': 'Incidence deleted successfully'})
    
#     def deleteIncidencestation(self, request, id):
#         incidence_slot = Incidencestation.objects.get(id=id)
#         incidence_slot.delete()
#         return Response({'data': 'Incidence deleted successfully'})
    
