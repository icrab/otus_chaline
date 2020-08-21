from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializer import TeaGradeSerializer, GradeTeaSerializer
from tea.models import Tea, Grade


class TeaViewSet(ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = TeaGradeSerializer
    queryset = Tea.objects.all()


class GradeViewSet(ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = GradeTeaSerializer
    queryset = Grade.objects.all()



