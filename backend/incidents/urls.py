from django.urls import path
from .views import IncidenceslotView,IncidencebiciView,IncidencestationView,IncidentsView,NotificationsView

urlpatterns = [
    # INCIDENTS
    # ver las inicidencias user
    path('incidentsslot', IncidenceslotView.as_view({"get": "getIncidents"})),
    path('incidentsbici', IncidencebiciView.as_view({"get": "getIncidents"})),
    path('incidentsstation', IncidencestationView.as_view({"get": "getIncidents"})),
    # ver las incidencias admin
    path('incidentsadslot', IncidentsView.as_view({"get": "getAllIncidentsSlots"})),
    path('incidentsadbici', IncidentsView.as_view({"get": "getAllIncidentsbicis"})),
    path('incidentsadstation', IncidentsView.as_view({"get": "getAllIncidentsstations"})),
    # update admin
    path('slot_incidence/<str:id>', IncidentsView.as_view({"put": "updateIncidenceSlot"})),
    path('bici_incidence/<str:id>', IncidentsView.as_view({"put": "updateIncidencebici"})),
    path('station_incidence/<str:id>', IncidentsView.as_view({"put": "updateIncidencestation"})),
    # delete admin
    path('slotincidence/<str:id>', IncidentsView.as_view({"delete": "deleteIncidenceslot"})),
    path('biciincidence/<str:id>', IncidentsView.as_view({"delete": "deleteIncidencebici"})),
    path('stationincidence/<str:id>', IncidentsView.as_view({"delete": "deleteIncidencestation"})), 

    # USER INCIDENTS
    # create user
    path('slot_incidence', IncidenceslotView.as_view({"post": "post_slot"})),
    path('bici_incidence', IncidencebiciView.as_view({"post": "post_bici"})),
    path('station_incidence', IncidencestationView.as_view({"post": "post_station"})),

    # NOTIFICATIONS
    path('notifications', NotificationsView.as_view({"get": "get"})),
    path('notifications/<int:id>', NotificationsView.as_view({"put": "seenNotification"})),
]
