from rest_framework import serializers
from .models import StudyTask

class StudyTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyTask
        fields = '__all__'