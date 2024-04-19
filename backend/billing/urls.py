from django.urls import path
from .views import BillingView,BillingViewAdmin

urlpatterns = [
    # BILLING
    # admin
    path('billingall', BillingViewAdmin.as_view({"get": "getAllbilling"})),
    path('billing_update/<str:id>', BillingViewAdmin.as_view({"put": "updateBilling"})),
    path('billingdelete/<str:id>', BillingViewAdmin.as_view({"delete": "deleteBilling"})),
    # USER BILLING
    # user
    path('billing', BillingView.as_view({"get": "getBilling"})),
    path('billing_create', BillingView.as_view({"post": "postbilling"})),
    path('billing/<str:id>', BillingView.as_view({'get': 'getOneBilling'})),
   
]
