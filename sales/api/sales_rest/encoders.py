from .models import AutomobileVO, Salesperson, Customer, Sale
from common.json import ModelEncoder


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = {
        "id",
        "vin",
        "sold"
    }


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = {
        "id",
        "first_name",
        "last_name",
        "employee_id"
    }


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = {
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number"
    }


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = {
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price"
    }

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }
