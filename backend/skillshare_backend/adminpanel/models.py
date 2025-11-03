from django.db import models
from django.conf import settings
from skills.models import Skill

class ModerationLog(models.Model):
    ACTION_CHOICES = [
        ('approved', 'Approved'),
        ('removed', 'Removed'),
        ('flagged', 'Flagged'),
    ]

    admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='moderation_actions')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='moderation_logs')
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    reason = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.admin.username} {self.action} {self.skill.title}"