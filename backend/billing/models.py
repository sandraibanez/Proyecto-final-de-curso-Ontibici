from django.db import models
from users.models import User
from rent.models import Rent

class Billing(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_Billing")
    rent = models.ForeignKey(Rent, on_delete=models.CASCADE,null=True, related_name="rent_Billing")
    pay = models.CharField(max_length=25)

    def __str__(self):
        return str(self.id)
