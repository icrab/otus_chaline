from django.urls import path
from rest_framework.authtoken import views
from .views import Logout

urlpatterns = [
    path('login/', views.obtain_auth_token),
    path('logout/', Logout.as_view())
]
