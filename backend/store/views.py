from django.shortcuts import render
from store.models import Category,Product
from store.serializer import CartSerializer, ProductSerializer,CategorySerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny 
# Create your views here.



class CategoryListAPIView(generics.ListAPIView):
    queryset=Category.objects.all()
    serializer_class= CategorySerializer
    permission_classes = [AllowAny]



class ProductListAPIView(generics.ListAPIView):
    queryset=Product.objects.all()
    serializer_class= ProductSerializer
    permission_classes = [AllowAny]


class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class=ProductSerializer
    permission_classes=[AllowAny]

    def get_object(self):
        slug=self.kwargs['slug']
        query = Product.objects.get(slug=slug)
        return query  