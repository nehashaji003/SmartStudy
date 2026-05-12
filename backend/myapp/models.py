from django.db import models

class StudyTask(models.Model):

    PRIORITY_CHOICES = [
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]

    title = models.CharField(max_length=200)

    category = models.CharField(
        max_length=100,
        default='Coding'
    )

    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='Medium'
    )

    due_date = models.DateField(
        default='2026-05-08'
    )

    completed = models.BooleanField(
        default=False
    )

    def __str__(self):
        return self.title