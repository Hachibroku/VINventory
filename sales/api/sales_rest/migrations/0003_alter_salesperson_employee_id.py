# Generated by Django 4.0.3 on 2023-07-28 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_rename_customer_sale_customer_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salesperson',
            name='employee_id',
            field=models.PositiveIntegerField(null=True, unique=True),
        ),
    ]
