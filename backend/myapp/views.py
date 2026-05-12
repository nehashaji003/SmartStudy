from rest_framework import viewsets
from .models import StudyTask
from .serializers import StudyTaskSerializer

class StudyTaskViewSet(viewsets.ModelViewSet):
    queryset = StudyTask.objects.all()
    serializer_class = StudyTaskSerializer