from django.shortcuts import render

from .models import User, Profile
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import MyTokenObtainPairSerializer ,RegisterSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.


class MyTokenOptainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny,]   
    serializer_class = RegisterSerializer 