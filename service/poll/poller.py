import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something
from service_rest.models import AutomobileVO


def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            response = requests.get('http://project-beta-inventory-api-1:8000/api/automobiles/')
            print(response.status_code)
            if response.status_code == 200:
                automobiles = response.json()
                for automobile in automobiles["autos"]:
                    AutomobileVO.objects.update_or_create(
                        vin=automobile['vin'],
                        defaults={
                            'vin': automobile['vin'],
                            'sold': automobile['sold'],
                        }
                    )
                print(f'Imported {len(automobiles["autos"])} automobiles')
            else:
                print(f'Error in API call: {response.status_code}')

        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(60)


if __name__ == "__main__":
    poll()
