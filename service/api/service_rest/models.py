from django.db import models
from django.urls import reverse

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField(null=True)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=250)
    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default="Scheduled")

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.pk})

    def __str__(self):
        return self.date_time

    class Meta:
        ordering = ("date_time",)
