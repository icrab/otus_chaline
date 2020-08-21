from django.contrib import admin
from .models import Order, Product


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = 'id', 'user'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = 'id', 'count'

