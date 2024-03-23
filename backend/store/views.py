from django.shortcuts import render
from store.models import Category,Product,Cart,Tax
from store.serializer import CartSerializer, ProductSerializer,CategorySerializer
from rest_framework import generics,status
from rest_framework.permissions import AllowAny 
from userauths.models import User
from decimal import Decimal
from rest_framework.response import Response
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
    
class CartAPIView(generics.ListCreateAPIView):
    queryset=Cart.objects.all()
    serializer_class=CartSerializer
    permission_classes=[AllowAny]  


    def create(self, request, *args, **kwargs):
        payload=request.data 

        product_id=payload['product_id']
        user_id=payload['user_id']
        qty=payload['qty']
        price=payload['price']
        shipping_amount=payload['shipping_amount']
        country=payload['country']
        size=payload['size']
        color=payload['color']
        cart_id=payload['cart_id']


        product=Product.objects.get(id=product_id)

        if user_id != "undefined":
            user = User.objects.get(id=user_id)

        else:
            user = None 

        tax = Tax.objects.filter(country=country).first()
        if tax:
            tax_rate = tax.rate /100
        else:
            tax_rate = 0

        cart = Cart.objects.filter(cart_id=cart_id, product=product).first()

        if cart:
            cart.user=user
            cart.product=product
            cart.qty=qty
            cart.price=price
            cart.sub_total= Decimal(price) * int(qty)
            cart.shipping_amount = Decimal(shipping_amount) * int(qty)
            cart.tax_fee = int(qty) * Decimal(tax_rate)
            cart.color=color
            cart.size=size
            cart.country=country
            cart.cart_id=cart_id


            service_fee_percentage = 10 / 100
            cart.service_fee = Decimal(service_fee_percentage)  * cart.sub_total

            cart.total =cart.sub_total + cart.shipping_amount + cart.tax_fee
            cart.save()
            return Response({'message': "Cart Updated Successfully"}, status=status.HTTP_200_OK)

        else:
            cart=Cart()
            cart.user=user
            cart.product=product
            cart.qty=qty
            cart.price=price
            cart.sub_total= Decimal(price) * int(qty)
            cart.shipping_amount = Decimal(shipping_amount) * int(qty)
            cart.tax_fee = int(qty) * Decimal(tax_rate)
            cart.color=color
            cart.size=size
            cart.country=country
            cart.cart_id=cart_id


            service_fee_percentage = 10 / 100
            cart.service_fee = Decimal(service_fee_percentage) * cart.sub_total

            cart.total =cart.sub_total + cart.shipping_amount + cart.tax_fee
            cart.save()
            return Response({'message': "Cart Created Successfully"}, status=status.HTTP_201_CREATED)

