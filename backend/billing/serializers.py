from rest_framework import serializers
from .models import Billing
from users.models import User
from rent.models import Rent
import jwt
from django.conf import settings
from datetime import datetime

class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = [ 'id', 'pay', 'user_id', 'rent_id']

    def usertoken(context):
        token = context['token']
        payload = jwt.decode(token, settings.SECRET_KEY)
        user = User.objects.get(username=payload['username'])
        return (user.username, token, user.type, user.id)

    def to_billing(instance):
        return ({
            "id": instance.id,
            "pay": instance.pay,
            "user_id": instance.user_id,
            "rent_id": instance.rent_id,
        })

    def billing(context):
        print (context)
        username = context['username']
        rent_id = context['rent_id']
        pay = context ['pay']

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')

        rent = Rent.objects.get(pk=rent_id)
        if rent is None:
            raise serializers.ValidationError('Rent not found')
        fecha_inicio = rent.initial_date
        fecha_fin = rent.end_date
        tarifa_por_hora = pay
        duracion_alquiler = fecha_fin - fecha_inicio
        precio_total = duracion_alquiler.total_seconds() / 3600 * tarifa_por_hora
        print (precio_total)
        billing = Billing.objects.create(pay=pay, user_id=user.id, rent_id=rent.id)

        billing.save()
        return billing

   
    # def updateStatus(id, context):
    #     new_status = context['status']
    #     incidence = Incidenceslot.objects.get(id=id)

    #     if incidence is None:
    #         raise serializers.ValidationError('Slot not found')

    #     if (incidence.status == 'resolved'):    
    #         raise serializers.ValidationError('The incidence is already resolved')

    #     if (new_status == 'pending'):
    #         incidence.status = 'pending'
    #     elif (new_status == 'in_progress'):
    #         incidence.status = 'in_progress'
    #         print('dentro del if',incidence.user_id)
    #         Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is in progress.", user_id= incidence.user_id, seen=False)
    #     elif (new_status == 'resolved'):
    #         incidence.status = 'resolved'
    #         Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is resolved. Thank you!", user_id=incidence.user_id, seen=False)
    #     else:
    #         raise serializers.ValidationError('The incidence is closed')

    #     incidence.save()
    #     return incidence
    
