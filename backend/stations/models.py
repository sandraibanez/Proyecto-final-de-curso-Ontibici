from django.db import models

class Stations(models.Model):
    slug = models.CharField(max_length=255, blank=False, default='')
    name = models.CharField(max_length=200, blank=False, default='')
    direction = models.CharField(max_length=255, blank=False, default='')
    location = models.CharField(max_length=200, blank=False, default='')
    img = models.CharField(max_length=255, blank=False, default='')
    long = models.DecimalField(max_digits=30, decimal_places=20, null=False)
    latitud = models.DecimalField(max_digits=30, decimal_places=20, null=False)
    
    def __str__(self):
        return str(self.id)
class Bicis(models.Model):
    slug = models.CharField(max_length=255, unique=True, editable=False)
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default='')

    def __str__(self):
        return str(self.id)

class Slot(models.Model):
    stations = models.ForeignKey(Stations, on_delete=models.CASCADE, null=False, related_name="slots")
    bici = models.OneToOneField(Bicis, on_delete=models.CASCADE, null=True, unique=True, related_name="slots")
    status = models.CharField(max_length=100)
    slot_number = models.IntegerField()

    def __str__(self):
        return str(self.id)