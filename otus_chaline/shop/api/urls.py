from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet
from rest_framework.authtoken import views


urlpatterns = [
    path('token/', views.obtain_auth_token),
    path('order/', OrderViewSet.as_view()),
    path('', include('tea.api.urls')),
]
