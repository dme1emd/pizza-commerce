from rest_framework import serializers
from pizza.models import *
class IngredientSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Ingredient
        fields = ['name']
class PizzaSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Pizza
        fields = ['name','price','ingredients']
class PizzeriaSerializer(serializers.ModelSerializer):
    pizzas = PizzaSerializer(many=True)
    class Meta : 
        model = Pizzeria
        fields = ['city','pizzas']