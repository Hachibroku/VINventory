from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
    sold = models.CharField(max_length=100)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return self.first_name


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)

    def __str__(self):
        return self.first_name


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )
    Salesperson = models.ForeignKey(
        Salesperson,
        related_name="salespersons",
        on_delete=models.CASCADE,
    )
    Customer = models.ForeignKey(
        Customer,
        related_name="customers",
        on_delete=models.CASCADE,
    )
    price = models.FloatField()
