from rest_framework import response , decorators
from .serializers import *
from pizza.models import *
# Create your views here.
@decorators.api_view(['GET'])
def PizzeriaPizzasApiView(request , pk):
    pizzeria = Pizzeria.objects.get(pk=pk)
    serializer = PizzeriaSerializer(instance=pizzeria,many = False , context={'request': request}).data
    return response.Response(serializer,status=200)
@decorators.api_view(['GET'])
def SearchPizzeria(request,city):
    queryset = Pizzeria.objects.filter(city__icontains = city)
    serializer = PizzeriaSerializer(queryset , many = True).data
    return response.Response(data=serializer ,status=200)