from django.urls import path
from .views import *
urlpatterns = [
    path('pizzas/<int:pk>/',PizzeriaPizzasApiView)
]