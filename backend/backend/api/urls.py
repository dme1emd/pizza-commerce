from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('pizzas/<int:pk>/',PizzeriaPizzasApiView),
    path('pizzeria/<str:city>',SearchPizzeria),
    path('ingredients/',IngredientsApiView),
    path('command/',CommandApiView),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]