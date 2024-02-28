from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import RentSerializer
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from core.permissions import IsAdmin
from .models import Rent

class RentView(viewsets.GenericViewSet):
    def rent(self, request, slot_id):
        bearer = request.headers['Authorization'].split()
        
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer = RentSerializer.usertoken(
        context=serializer_context_user)
        username = serializer[0]
       
        serializer_context = { 'username': username, 'slot_id': slot_id }
        
        serializer = RentSerializer.rent(context=serializer_context)
        # return Response(serializer)
        return Response(RentSerializer.to_rent(serializer))

    def getOneRent(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = RentSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        serializer_context = { 'username': username }
        serializer = RentSerializer.getOneRent(context=serializer_context)
        return Response(RentSerializer.to_rent(serializer))

    def bringbackBicis(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = RentSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[0]
        data = request.data['bici']
        serializer_context = {'username': username, 'slot_id': data['end_slot'], 'bici_id': data['bici_id'] }
        serializer = RentSerializer.bringbackBicis(context=serializer_context)
        return Response(RentSerializer.to_rent(serializer))

class RentAdminView(viewsets.GenericViewSet):

    def getAllRents(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = RentSerializer.usertoken(
        context=serializer_context_user)
        if serializer_user[2] == 'admin':
            data = Rent.objects.all()
            serializer = RentSerializer(data, many=True)
        return Response(serializer.data)

    def deleteRent(self, request, id):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = RentSerializer.usertoken(
        context=serializer_context_user)
        if serializer_user[2] == 'admin':
            rent = Rent.objects.get(id=id)
            rent.delete()
        return Response({'data': 'Rent deleted successfully'})

