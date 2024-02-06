from django.contrib import admin
from .models import User, Profile
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'phone']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'gender', 'country']
    search_fields = ['full_name']
    list_filter = ['date']    

admin.site.register(User,UserAdmin)
admin.site.register(Profile,ProfileAdmin)