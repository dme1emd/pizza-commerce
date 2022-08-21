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
def SearchPizzeria(request,city=None):
    queryset = Pizzeria.objects.filter(city__icontains = city)
    serializer = PizzeriaSerializer(queryset , many = True,context={'request': request}).data
    return response.Response(data=serializer ,status=200)
@decorators.api_view(['GET'])
def IngredientsApiView(request,city=None):
    queryset = Ingredient.objects.all()
    serializer = IngredientSerializer(queryset , many = True).data
    return response.Response(data=serializer ,status=200)
@decorators.api_view(['POST' , 'GET'])
def CommandApiView(request,city=None):
    if request.method == 'POST':
        print(request.data)
        data = request.data
        adress = data.get('adress')
        command = Order.objects.create(adress = adress)
        for key in data.get('cart') :
            pizza = data.get('cart').get(key)
            if pizza.get('custom'):
                pizza_order = OrderPizza.objects.create(order = command , pizza = Pizza.objects.create(name='Custom') ,quantity = pizza.get('quantity'))
                pizza_order.save()
                print(OrderPizza.objects.all())
            else :
                pizza_order = OrderPizza.objects.create(order = command , pizza = Pizza.objects.get(name =pizza.get('name')) , quantity = pizza.get('quantity'))
                pizza_order.save()
                print(OrderPizza.objects.all())
    return response.Response(status=200)
