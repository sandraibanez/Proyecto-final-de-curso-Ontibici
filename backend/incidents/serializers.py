from rest_framework import serializers
from .models import Incidenceslot, Incidencebici,Incidencestation, Notification
from users.models import User
from stations.models import Slot, Bicis, Stations
import jwt
from django.conf import settings

class IncidenceslotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incidenceslot
        fields = [ 'id', 'title', 'status', 'desc', 'user_id', 'slot_id']

    def usertoken(context):
        token = context['token']
        payload = jwt.decode(token, settings.SECRET_KEY)
        user = User.objects.get(username=payload['username'])
        return (user.username, token, user.type, user.id)

    def to_incidence_slot(instance):
        return ({
            "id": instance.id,
            "title": instance.title,
            "status": instance.status,
            "desc": instance.desc,
            "user_id": instance.user_id,
            "slot_id": instance.slot_id
        })

    def createslot(context):
        print (context)
        username = context['username']
        slot_id = context['slot_id']
        title = context['title']
        desc = context['desc']

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')

        slot = Slot.objects.get(pk=slot_id)
        if slot is None:
            raise serializers.ValidationError('Slot not found')

        if title is None:
            raise serializers.ValidationError('Title is required')

        if desc is None:
            raise serializers.ValidationError('Description is required')

        incidence = Incidenceslot.objects.create(title=title, desc=desc, user_id=user.id, slot_id=slot.id)

        incidence.save()
        return incidence

   
    def updateStatus(id, context):
        new_status = context['status']
        incidence = Incidenceslot.objects.get(id=id)

        if incidence is None:
            raise serializers.ValidationError('Slot not found')

        if (incidence.status == 'resolved'):    
            raise serializers.ValidationError('The incidence is already resolved')

        if (new_status == 'pending'):
            incidence.status = 'pending'
        elif (new_status == 'in_progress'):
            incidence.status = 'in_progress'
            print('dentro del if',incidence.user_id)
            Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is in progress.", user_id= incidence.user_id, seen=False)
        elif (new_status == 'resolved'):
            incidence.status = 'resolved'
            Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is resolved. Thank you!", user_id=incidence.user_id, seen=False)
        else:
            raise serializers.ValidationError('The incidence is closed')

        incidence.save()
        return incidence
    
class IncidenceSerializerbici(serializers.ModelSerializer):
    class Meta:
        model = Incidencebici
        fields = [ 'id', 'title', 'status', 'desc', 'user_id', 'bici_id']

    def usertoken(context):
        token = context['token']
        payload = jwt.decode(token, settings.SECRET_KEY)
        user = User.objects.get(username=payload['username'])
        return (user.username, token, user.type)

    def to_incidence_bici(instance):
        return ({
            "id": instance.id,
            "title": instance.title,
            "status": instance.status,
            "desc": instance.desc,
            "user_id": instance.user_id,
            "bici_id": instance.bici_id
        })
   
    def createbici(context):
        print (context)
        username = context['username']
        bici_id = context['bici_id']
        title = context['title']
        desc = context['desc']

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')

        bici = Bicis.objects.get(pk=bici_id)
        if bici is None:
            raise serializers.ValidationError('Bici not found')

        if title is None:
            raise serializers.ValidationError('Title is required')

        if desc is None:
            raise serializers.ValidationError('Description is required')

        incidence = Incidencebici.objects.create(title=title, desc=desc, user_id=user.id, bici_id=bici.id)

        incidence.save()
        return incidence
    
    def updateStatus(id, context):
        new_status = context['status']
        incidence = Incidencebici.objects.get(id=id)

        if incidence is None:
            raise serializers.ValidationError('bici not found')

        if (incidence.status == 'resolved'):    
            raise serializers.ValidationError('The incidence is already resolved')

        if (new_status == 'pending'):
            incidence.status = 'pending'
        elif (new_status == 'in_progress'):
            incidence.status = 'in_progress'
            Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is in progress.", user_id=incidence.user_id, seen=False)
        elif (new_status == 'resolved'):
            incidence.status = 'resolved'
            Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is resolved. Thank you!", user_id=incidence.user_id, seen=False)
        else:
            raise serializers.ValidationError('The incidence is closed')

        incidence.save()
        return incidence

class IncidenceSerializerstation(serializers.ModelSerializer):
    class Meta:
        model = Incidencestation
        fields = [ 'id', 'title', 'status', 'desc', 'user_id','station_id']

    def usertoken(context):
        token = context['token']
        payload = jwt.decode(token, settings.SECRET_KEY)
        user = User.objects.get(username=payload['username'])
        return (user.username, token, user.type)

    
    def to_incidence_station(instance):
        return ({
            "id": instance.id,
            "title": instance.title,
            "status": instance.status,
            "desc": instance.desc,
            "user_id": instance.user_id,
            "station_id": instance.station_id
        })

    def createstation(context):
        username = context['username']
        station_id = context['station_id']
        title = context['title']
        desc = context['desc']

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')

        station = Stations.objects.get(pk=station_id)
        if station is None:
            raise serializers.ValidationError('station not found')

        if title is None:
            raise serializers.ValidationError('Title is required')
 
        if desc is None:
            raise serializers.ValidationError('Description is required')

        incidence = Incidencestation.objects.create(title=title, desc=desc, user_id=user.id, station_id=station.id)

        incidence.save()
        return incidence
    
    def updateStatus(id, context):
        new_status = context['status']
        incidence = Incidencestation.objects.get(id=id)

        if incidence is None:
            raise serializers.ValidationError('station not found')

        if (incidence.status == 'resolved'):    
            raise serializers.ValidationError('The incidence is already resolved')

        if (new_status == 'pending'):
            incidence.status = 'pending'
        elif (new_status == 'in_progress'):
            incidence.status = 'in_progress'
            Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is in progress.", user_id=incidence.user_id, seen=False)
        elif (new_status == 'resolved'):
            incidence.status = 'resolved'
            Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is resolved. Thank you!", user_id=incidence.user_id, seen=False)
        else:
            raise serializers.ValidationError('The incidence is closed')

        incidence.save()
        return incidence

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'desc', 'seen']

    def usertoken(context):
        token = context['token']
        payload = jwt.decode(token, settings.SECRET_KEY)
        user = User.objects.get(username=payload['username'])
        return (user.username, token, user.type, user.id)
    
    def to_notification(instance):
        return ({
            "id": instance.id,
            "desc": instance.desc,
            "seen": instance.seen
        })

    def getUserNotification(username):
        user = User.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        notification = Notification.objects.filter(user_id=user.id, seen=False)
        return notification

    def seeNotification(context):
        notification_id = context['id']
        username = context['username']

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User is not found')

        notification = Notification.objects.get(pk=notification_id, user_id=user.id, seen=False)
        if notification is None:
            raise serializers.ValidationError('Notification not found')

        notification.seen = True
        notification.save()

        return notification
