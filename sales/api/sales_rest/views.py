import json
from django.shortcuts import render
from .models import AutomobileVO, Salesperson, Customer, Sale
from .encoders import AutomobileVOEncoder, SalespersonEncoder, CustomerEncoder, SaleEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse





@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson" : salesperson},
            encoder=SalespersonEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse(
                {"Message": "Error, Does not exist"}
            )
            response.status_code = 404
            return response


@require_http_methods(["GET", "DELETE"])
def api_salesperson_specific(request, id):
    if request.method == "GET":
        salesperson = Salesperson.objects.filter(id=id)
        return JsonResponse(
            {"Salesperson": salesperson},
            encoder=SalespersonEncoder,
            safe=False
        )
    else:
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer" : customer},
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except customer.DoesNotExist:
            response = JsonResponse(
                {"Message": "Error, Does not exist"}
            )
            response.status_code = 404
            return response


@require_http_methods(["GET", "DELETE"])
def api_customer_specific(request, id):
    if request.method == "GET":
        customer = Customer.objects.filter(id=id)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
            safe=False
        )
    else:
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            {"Sale": sale},
            encoder=SaleEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)

        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson"},
                status=400,
            )

        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status=400,
            )

        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer"},
                status = 400,
            )
        
        sales = Sale.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SaleEncoder,
            safe=False,
        )



@require_http_methods(["GET", "DELETE"])
def api_sales_specific(request, id):
    pass
