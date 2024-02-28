from rest_framework import serializers 
from .models import Stations
from .models import Slot
from .models import Bicis
from random import randint
class StationsSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Stations
        fields = ('id','slug','name','direction','location','img', 'long', 'latitud')
        
class BicisSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bicis
        fields = ['id', 'slug', 'name', 'status']

class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = ['id', 'stations_id', 'bici_id', 'status', 'slot_number']

    def to_Slot(instance):
        
        return {
            "id": instance.id,
            "stations_id": instance.stations_id,
            "bici_id": instance.bici_id,
            "status": instance.status,
            "slot_number": instance.slot_number,
        }

    def create(context, number):

        stations_id = context['station_id']
        
        station = Stations.objects.get(pk=stations_id)
        if station is None:
            raise serializers.ValidationError('Station not found')

        slot = Slot.objects.create(stations_id=stations_id, bici_id=None, status="vacant", slot_number=number+1)
        slot.save()
        return slot

    def update(context, instance):
        bici_id = context['bici_id']
        context_status = context['status']

        if context_status == 'manteinance':
            instance.status = 'manteinance'
            instance.save()
            return instance

        if bici_id != 0 and instance.bici_id is not None:
            raise serializers.ValidationError('Slot is already in use')

        if bici_id != 0 and not None:
            bici = Bicis.objects.get(pk=bici_id)
            if bici is None:
                raise serializers.ValidationError('bici not found')

            instance.bici_id = bici_id
            instance.status = "in_use"

        if bici_id == 0:
            instance.bici_id = None
            instance.status = "vacant"

        instance.save()
        return instance

    def create_slot_dummys(context):
        stations_id = context['stations_id']
        status = context['status']
        number = context['slot_number'] + 1
        bici = Bicis.objects.filter(status='in_use')

        if (status == 'in_use' and len(bici) > 0):
            bici = Bicis.objects.get(pk=bici[randint(0, len(bici)-1)].id)
            slot = Slot.objects.create(stations_id=stations_id, bici_id=bici.id, status="in_use", slot_number=number)
            bici.status = 'vacant'
            bici.save()
        else:
            slot = Slot.objects.create(stations_id=stations_id, bici_id=None, status="vacant", slot_number=number)
            
        slot.save()
        return slot
