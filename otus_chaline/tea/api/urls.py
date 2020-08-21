from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeaViewSet, GradeViewSet

router = DefaultRouter()
router.register('tea', TeaViewSet)
router.register('grade', GradeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
