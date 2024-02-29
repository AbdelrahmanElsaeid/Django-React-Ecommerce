from django.db import models
from userauths.models import Profile, User
from vendor.models import Vendor
from shortuuid.django_fields import ShortUUIDField
from django.utils.text import slugify
# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.FileField(upload_to="category", default="category.jpg", null=True, blank=True)
    active = models.BooleanField(default=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural="Category"
        ordering = ['title']

class Product(models.Model):

    STATUS = (
        ("draft","draft"),
        ("disabled","disabled"),
        ("in_review","in_review"),
        ("published","published"),
    )
    title = models.CharField(max_length=100)
    image = models.FileField(upload_to="product",default="product.jpg", null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    category= models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    old_price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    shipping_amount = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    stock_qty = models.PositiveIntegerField(default=1)
    in_stock = models.BooleanField(default=True)
    status = models.CharField(max_length=100, choices=STATUS, default="published")
    featured = models.BooleanField(default=False)
    views= models.PositiveIntegerField(default=0)
    rating = models.PositiveIntegerField(default=0)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    pid = ShortUUIDField(unique=True, length=10, alphabet="abcdefg123456")
    slug = models.SlugField(unique=True)
    date = models.DateTimeField(auto_now_add=True)

    def save(self,*args, **kwargs):
        if self.slug == "" or self.slug== None:
            self.slug =slugify(self.title)

        super(Product, self).save(*args, **kwargs) 

        def __str__(self):
            return self.title


class Gallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.FileField(upload_to="products",default="product.jpg")
    active = models.BooleanField(default=True)
    date=models.DateTimeField(auto_now_add=True)
    gid=ShortUUIDField(unique=True, length=10,alphabet="abcdefg123456")

    class Meta:
        verbose_name_plural="Product Images"

    def __str__(self):
        return self.product.title
    

class Specification(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    title = models.CharField(max_length=1000)
    content=models.CharField(max_length=1000)
    date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Size(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=1000)
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    date=models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name
   

class Color(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=1000)
    color_code = models.CharField(max_length=1000)


    def __str__(self):
        return self.name
   
