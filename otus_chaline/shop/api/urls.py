from django.urls import path, include
from .views import OrderViewSet


urlpatterns = [
    path('auth/', include('api_token.urls')),
    path('order/', OrderViewSet.as_view()),
    path('', include('tea.api.urls')),
]
