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

    def pay(context):
        print (context)
        pay = context['pay']
        # billing = Billing.objects.update(pay=pay)

        # pay.save()
        return pay

    def billing(context):
        print (context)
        username = context['username']
        rent_id = context['rent_id']
        pay = context['pay']
        # pay_context = {'pay': context['pay']}
        # pay = BillingSerializer.pay(pay_context)
        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')

        rent = Rent.objects.get(pk=rent_id)
        if rent is None:
            raise serializers.ValidationError('Rent not found')
        fecha_inicio = rent.initial_date
        fecha_fin = rent.end_date
        if fecha_fin and fecha_inicio:
            duracion_alquiler = fecha_fin - fecha_inicio
        # Resto de tu lógica aquí
        else:
        # Manejo del caso en que uno o ambos valores son None
        # Puedes asignar un valor predeterminado o lanzar una excepción, según tu necesidad.
            duracion_alquiler = 5
            pass
        
        print (fecha_fin, fecha_inicio)
        tarifa_por_hora = pay
        # duracion_alquiler = fecha_fin - fecha_inicio
        precio_total = duracion_alquiler.total_seconds() / 3600 * tarifa_por_hora
        print (precio_total)
        billing = Billing.objects.create(pay=pay, user_id=user.id, rent_id=rent.id)

        billing.save()
        return billing

   
    
