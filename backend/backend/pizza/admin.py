from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Pizzeria)
admin.site.register(Pizza)
admin.site.register(Ingredient)
admin.site.register(OrderPizza)
admin.site.register(Order)
