from django.db import models
from django.contrib.auth.models import BaseUserManager , AbstractBaseUser , PermissionsMixin
# Create your models here.
class ProfileManager(BaseUserManager):
    def create_user(self  , city,password = None) : 
        user = self.model(city=city)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self , city , password = None) :
        user = self.create_user( city =city,password= password)
        user.is_superuser = True
        user.save(using=self._db)
        return user
class PizzeriaProfile(PermissionsMixin , AbstractBaseUser):
    city = models.CharField(max_length=30 , unique=True)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_private = models.BooleanField(default=False)
    objects= ProfileManager()
    USERNAME_FIELD = 'city'
    def __str__(self):
        return f"profile object ({self.id})"