from django.urls import path, include
from .views import OrderViewSet, OrderBuyViewSet, OrderHistoryViewSet


urlpatterns = [
    path('auth/', include('api_token.urls')),
    path('order/', OrderViewSet.as_view()),
    path('order/history/', OrderHistoryViewSet.as_view()),
    path('order/buy/', OrderBuyViewSet.as_view()),
    path('', include('tea.api.urls')),
]
