from django.urls import path
from .views import BillingView

urlpatterns = [
    # INCIDENTS
    # ver las inicidencias user
    path('billing', BillingView.as_view({"get": "getBilling"})),
    # ver las incidencias admin
    # path('billingall', BillingView.as_view({"get": "getAllbilling"})),
    # update admin
    # path('slot_incidence/<str:id>', IncidentsView.as_view({"put": "updateIncidenceSlot"})),
    # path('bici_incidence/<str:id>', IncidentsView.as_view({"put": "updateIncidencebici"})),
    # path('station_incidence/<str:id>', IncidentsView.as_view({"put": "updateIncidencestation"})),
    # delete admin
    # path('slotincidence/<str:id>', IncidentsView.as_view({"delete": "deleteIncidenceslot"})),
    # path('biciincidence/<str:id>', IncidentsView.as_view({"delete": "deleteIncidencebici"})),
    # path('stationincidence/<str:id>', IncidentsView.as_view({"delete": "deleteIncidencestation"})), 

    # USER INCIDENTS
    # create user
    path('billing_create', BillingView.as_view({"post": "postbilling"})),
    # path('bici_incidence', IncidencebiciView.as_view({"post": "post_bici"})),
    # path('station_incidence', IncidencestationView.as_view({"post": "post_station"})),

   
]
