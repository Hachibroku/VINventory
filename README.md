# CarCar

Team:

* Murphey Osmundson - Service microservice
* Person 2 - Which microservice?

## Design
CarCar was designed with React as it's front-end framework and Bootstrap as it's CSS library. This framework is instrumental in tying together the various microservices and providing a seamless user experience. By making asynchronous calls to each microservice, the front-end presents a unified and responsive interface to the users, effectively abstracting the complexity of the underlying system.

## Service microservice

The service microservice follows the REST architectural style to manage and track vehicle service appointments, service history and service technicians. It features endpoints for fetching and updating service appointments, with special VIP status for sold vehicles. It is a secure and efficient Python-based application using Django and its REST framework. It maps fetched data to internal models and uses a separate module for syncing data from an inventory API. It's containerized with Docker for scalability and deployment convenience. 

## Sales microservice

The sales microservice follows the REST architectural style to manage and track vehicle sales, customers and sales staff. It features endpoints for fetching and updating vehicle inventory data, along with associated sales information. It is a secure and efficient Python-based application using Django and its REST framework. It maps fetched data to internal models and uses a separate module for syncing data from an inventory API. It's containerized with Docker for scalability and deployment convenience. 
