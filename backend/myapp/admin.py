from django.contrib import admin
from .models import StudyTask

@admin.register(StudyTask)
class StudyTaskAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'completed']