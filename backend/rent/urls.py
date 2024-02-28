from django.urls import path
from .views import RentView, RentAdminView

urlpatterns = [
    path('rent/<int:slot_id>', RentView.as_view({"post": "rent"})),
    path('rent', RentView.as_view({"get": "getOneRent"})),
    path('bringbackBicis', RentView.as_view({"post": "bringbackBicis"})),
    path('rents', RentAdminView.as_view({"get": "getAllRents"})),
    path('deleteRent/<int:id>', RentAdminView.as_view({"delete": "deleteRent"})),
]
