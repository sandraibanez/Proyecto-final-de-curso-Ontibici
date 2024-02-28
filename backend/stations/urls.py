from django.urls import path
from . import views
from .views import StationsView
from .views import SlotView
from .views import BicisView
urlpatterns = [      
    #staciones
    path('stations/', StationsView.as_view({'get': 'getStations'})),
    path('stations/<str:slug>', StationsView.as_view({'get': 'getOneStation'})),
    path('stations/', StationsView.as_view({'post': 'post'})),
    path('stations/<str:slug>', StationsView.as_view({'put': 'put'})),
    path('stations/<str:slug>', StationsView.as_view({'delete': 'delete'})),
    # slot
    path('slot', SlotView.as_view({'get': 'getSlots'})),
    path('slot/<int:id>', SlotView.as_view({"get": "getOneSlot"})),
    #bicis
    path('bici', BicisView.as_view({'get': 'getBicis'})),
    path('bici/<str:slug>', BicisView.as_view({'get': 'getOneBicis'})),
    path('bici', BicisView.as_view({'post': 'post'})),
    path('bici/<str:slug>', BicisView.as_view({'put': 'put'})),
    path('bici/<str:slug>', BicisView.as_view({'delete': 'delete'}))
]