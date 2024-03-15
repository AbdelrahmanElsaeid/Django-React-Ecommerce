from django.contrib import admin
from store.models import Product,Category, Gallery,Color,Specification,Size, Cart,CartOrder,CartOrderItem,ProductFaq,Review,Coupon,Notification, Wishlist,Tax
# Register your models here.

class GalleryInline(admin.TabularInline):
    model = Gallery
    extra=0

class ColorInline(admin.TabularInline):
    model = Color
    extra=0
class SpecificationInline(admin.TabularInline):
    model = Specification
    extra=0
class SizeInline(admin.TabularInline):
    model = Size   
    extra=0        

class ProductAdmin(admin.ModelAdmin):
    list_display=['title','price','category','shipping_amount','stock_qty','in_stock','vendor','featured']
    list_editable=['featured']
    list_filter=['date']
    search_fields=['title']
    inlines = [GalleryInline, ColorInline,SizeInline,SpecificationInline]



admin.site.register(Product,ProductAdmin)
admin.site.register(Category)


admin.site.register(Coupon)
admin.site.register(Cart)
admin.site.register(CartOrder)
admin.site.register(CartOrderItem)
admin.site.register(ProductFaq)
admin.site.register(Notification)
admin.site.register(Review)
admin.site.register(Wishlist)
admin.site.register(Tax)










