from django.shortcuts import render,redirect
from store.models import Category,Product,Cart,Tax,CartOrder,CartOrderItem,Coupon,Notification,Review
from store.serializer import CartSerializer, ProductSerializer,CategorySerializer,CartOrderSerializer,CouponSerializer,NotificationSerializer,ReviewSerializer
from rest_framework import generics,status
from rest_framework.permissions import AllowAny 
from userauths.models import User
from decimal import Decimal
from rest_framework.response import Response
# Create your views here.

class OrderAPIView(generics.ListAPIView):
    serializer_class=CartOrderSerializer
    permission_classes=[AllowAny,]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)

        orders = CartOrder.objects.filter(buyer=user, payment_status = "paid")

        return orders
    

class OrderDetailAPIView(generics.RetrieveAPIView):
    serializer_class=CartOrderSerializer
    permission_classes=[AllowAny,]

    def get_object(self):
        user_id = self.kwargs['user_id']
        order_oid = self.kwargs['order_oid']
        user = User.objects.get(id=user_id)

        orders = CartOrder.objects.get(buyer=user,oid=order_oid, payment_status = "paid")

        return orders    