from django.contrib import admin
from .models import Tea, Grade


@admin.register(Tea)
class TeaAdmin(admin.ModelAdmin):
    list_display = 'id', 'name', 'grade', 'cost'
    list_display_links = 'id', 'name'


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = 'id', 'type'
    list_display_links = 'id', 'type'
