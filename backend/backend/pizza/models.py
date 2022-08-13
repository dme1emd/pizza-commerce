from distutils.command.upload import upload
from email.policy import default
from django.db import models

# Create your models here.
class Pizza(models.Model):
    choices =[
        ('Pizza Marguerita','Pizza Marguerita'),
        ('Pizza Marguerita','Pizza Marguerita'),
        ('Neapolitan Pizza','Neapolitan Pizza'),
        ('Chicago Pizza','Chicago Pizza'),
        ('Greek Pizza','Greek Pizza'),
        ('custom','custom')
    ]
    name = models.CharField(max_length=120 ,choices=choices)
    price = models.DecimalField(default=0,max_digits=3 , decimal_places=2)
    pic = models.ImageField(upload_to = "pizza-pics" , null = True , default = None)
    pizzeria = models.ManyToManyField('Pizzeria' , related_name='pizzas')
    custom = models.BooleanField(default=False)
    def __str__(self):
        return self.name
class Ingredient(models.Model):
    choices =[
        ('olives','olives'),
        ('cheese','cheese'),
        ('Chorizo','Chorizo'),
        ('pineapple','pineapple'),
    ]
    name = models.CharField(max_length=100 , choices=choices)
    pizza = models.ManyToManyField(Pizza,related_name='ingredients',blank=True)
    price = models.DecimalField(default=0,max_digits=3 , decimal_places=2)
    def __str__(self):
        return self.name
class Pizzeria(models.Model):
    choices=[
        ('paris','paris'),
        ('new York', 'new York'),
        ('sidi aich','sidi aich'),
        ('roma','roma'),
        ('manchester','manchester')
    ]
    city = models.CharField(max_length=100,choices=choices)
    def __str__(self):
        return self.city
class OrderPizza(models.Model):
    pizza =models.ForeignKey(Pizza , on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1)
    order = models.ForeignKey('Order',on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.pizza.name}*{self.quantity}"
class Order(models.Model):
    total_price = models.DecimalField(default=0,max_digits=3 , decimal_places=2)
    adress = models.CharField(max_length=150)