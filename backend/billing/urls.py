from django.urls import path
from .views import BillingView,BillingViewAdmin

urlpatterns = [
    # INCIDENTS
    # ver las inicidencias user
    path('billing', BillingView.as_view({"get": "getBilling"})),
    # ver las incidencias admin
    path('billingall', BillingViewAdmin.as_view({"get": "getAllbilling"})),
    # update admin
    path('billing/<str:id>', BillingViewAdmin.as_view({"put": "updateBilling"})),
    
    # delete admin
    path('billingdelete/<str:id>', BillingViewAdmin.as_view({"delete": "deleteBilling"})),
    # USER INCIDENTS
    # create user
    path('billing_create', BillingView.as_view({"post": "postbilling"}))
   
]