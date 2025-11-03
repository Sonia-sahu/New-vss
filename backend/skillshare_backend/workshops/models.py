from django.db import models
from django.conf import settings

class Workshop(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    host = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='hosted_workshops')
    title = models.CharField(max_length=200)
    description = models.TextField()
    skill = models.ForeignKey('skills.Skill', on_delete=models.SET_NULL, null=True, related_name='workshops')
    date = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.status})"


class WorkshopRegistration(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name='registrations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='workshop_registrations')
    registered_at = models.DateTimeField(auto_now_add=True)
    attended = models.BooleanField(default=False)

    class Meta:
        unique_together = ('workshop', 'user')

    def __str__(self):
        return f"{self.user.username} registered for {self.workshop.title}"
