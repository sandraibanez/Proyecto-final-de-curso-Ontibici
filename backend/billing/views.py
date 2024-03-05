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

    def getOneBilling(self, request, id):
        billing = Billing.objects.get(id=id)
        Billing_serializer = BillingSerializer(billing)
        return Response(Billing_serializer.data)

class BillingViewAdmin(viewsets.GenericViewSet):

    def getAllbilling(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = BillingSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[2]
        if username == "admin":
            billing = Billing.objects.all()
            billing_serializer = BillingSerializer(billing, many=True)
        return Response(billing_serializer.data)
    
   
    def updateBilling(self, request, id):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = BillingSerializer.usertoken(
        context=serializer_context_user)
        username = serializer_user[2]
        if username == "admin":
            billing = Billing.objects.get(id=id)
            data = request.data.get('billing')
            serializer = BillingSerializer(instance=billing, data=data, partial=True)
            if (serializer.is_valid(raise_exception=True)):
                serializer.save()
        return Response(serializer.data)
    
  
    def deleteBilling(self, request, id):
        billing = Billing.objects.get(id=id)
        billing.delete()
        return Response({'data': 'Billing deleted successfully'})
    
    
