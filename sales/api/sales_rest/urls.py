from django.urls import path
from .views import api_salesperson, api_salesperson_specific, api_customer, api_customer_specific, api_sales, api_sales_specific


urlpatterns = [
    path('salespeople/', api_salesperson, name="api_salesperson"),
    path('salespeople/<int:id>/', api_salesperson_specific, name="api_salesperson_specific"),
    path('customers/', api_customer, name="api_customer"),
    path('customers/<int:id>/', api_customer_specific, name="api_customer_specific"),
    path('sales/', api_sales, name="api_sales"),
    path('sales/<int:id>/', api_sales_specific, name="api_sales_specific"),
]
