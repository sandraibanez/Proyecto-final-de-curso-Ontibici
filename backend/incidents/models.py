from django.db import models
from users.models import User
from stations.models import Slot, Bicis, Stations

class Incidenceslot(models.Model):

    title = models.CharField(max_length=25)
    status = models.CharField(max_length=100, default='pending')
    desc = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_incidentslot")
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE,null=True, related_name="slot_affected")

    def __str__(self):
        return str(self.id)
class Incidencebici(models.Model):

    title = models.CharField(max_length=25)
    status = models.CharField(max_length=100, default='pending')
    desc = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_incidentbici")
    bici = models.ForeignKey(Bicis, on_delete=models.CASCADE,null=True, related_name="bici_affected") 

    def __str__(self):
        return str(self.id)
class Incidencestation(models.Model):

    title = models.CharField(max_length=25)
    status = models.CharField(max_length=100, default='pending')
    desc = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_incidentstation")
    station = models.ForeignKey(Stations, on_delete=models.CASCADE,null=True, related_name="station_affected")

    def __str__(self):
        return str(self.id)

class Notification(models.Model):

    seen = models.BooleanField(default=False)
    desc = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_notification")

    def __str__(self):
        return str(self.id)


