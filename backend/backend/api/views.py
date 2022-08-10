from os import stat
from django.shortcuts import render
from rest_framework import response , decorators
from .serializers import *
from pizza.models import *
# Create your views here.
@decorators.api_view(['GET'])
def PizzeriaPizzasApiView(request , pk):
    pizzeria = Pizzeria.objects.get(pk=pk)
    serializer = PizzeriaSerializer(instance=pizzeria,many = False).data
    return response.Response(serializer,status=200)