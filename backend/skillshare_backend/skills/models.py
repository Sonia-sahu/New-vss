from django.db import models
from django.conf import settings

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('tech', 'Technology'),
        ('art', 'Art'),
        ('cooking', 'Cooking'),
        ('music', 'Music'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='skills')
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.user.username}"


class SkillAnalytics(models.Model):
    skill = models.OneToOneField(Skill, on_delete=models.CASCADE, related_name='analytics')
    learners_count = models.PositiveIntegerField(default=0)
    average_rating = models.FloatField(default=0.0)

    def __str__(self):
        return f"Analytics for {self.skill.title}"