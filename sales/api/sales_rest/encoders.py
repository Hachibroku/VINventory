from .models import AutomobileVO, Salesperson, Customer, Sale
from common.json import ModelEncoder


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = {
        "vin",
        "sold"
    }


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = {
        "first_name",
        "last_name",
        "employee_id"
    }


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = {
        "first_name",
        "last_name",
        "address",
        "phone_number"
    }


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = {
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
