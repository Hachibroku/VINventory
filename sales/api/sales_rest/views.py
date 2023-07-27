import json
from django.shortcuts import render
from .models import AutomobileVO, Salesperson, Customer, Sale
from .encoders import AutomobileVOEncoder, SalespersonEncoder, CustomerEncoder, SaleEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.db import IntegrityError


@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople" : salesperson},
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
    try:
        salesperson = Salesperson.objects.get(id=id)
    except Salesperson.DoesNotExist:
        return JsonResponse({"Error": "Salesperson does not exist"}, status=404)

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
            {"customers" : customer},
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
    try:
        customer = Customer.objects.get(id=id)
    except Customer.DoesNotExist:
        return JsonResponse({"Error": "Customer does not exist"}, status=404)

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
        sales = Sale.objects.all()

        salesperson_id = request.GET.get('salesperson')
        if salesperson_id is not None:
            sales = sales.filter(salesperson__id=salesperson_id)

        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )

    else:
        try:
            content = json.loads(request.body)

            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            customer = Customer.objects.get(id=content["customer"])

            content["automobile"] = automobile
            content["salesperson"] = salesperson
            content["customer"] = customer

            sales = Sale.objects.create(**content)

            return JsonResponse(
                sales,
                encoder=SaleEncoder,
                safe=False,
            )
        except (ValueError, IntegrityError, AutomobileVO.DoesNotExist, Salesperson.DoesNotExist, Customer.DoesNotExist) as e:
            return JsonResponse(
                {"message": str(e)},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_sales_specific(request, id):
    try:
        sale = Sale.objects.get(id=id)
    except Sale.DoesNotExist:
        return JsonResponse({"Error": "Sale does not exist"}, status=404)

    if request.method == "GET":
        sale = Sale.objects.filter(id=id)
        return JsonResponse(
            {"sales": sale},
            encoder=SaleEncoder,
            safe=False
        )
    else:
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0})
