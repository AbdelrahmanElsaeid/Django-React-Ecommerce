from django.shortcuts import render

from .models import User, Profile
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import MyTokenObtainPairSerializer ,RegisterSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny

import random
import shortuuid

# Create your views here.


class MyTokenOptainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny,]   
    serializer_class = RegisterSerializer 


def generate_otp():
    uuid_key = shortuuid.uuid()
    unique_key = uuid_key[:6]
    return unique_key

class PasswordRestEmailVerify(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

    def get_object(self):
        email = self.kwargs['email']
        user = User.objects.get(email=email)

        if user:
            user.otp= generate_otp()
            user.save()

            uidb64 = user.pk
            otp = user.otp

            link = f"http://localhost:5173/create-new-password?otp{otp}&uid64={uidb64}/"

        return user        