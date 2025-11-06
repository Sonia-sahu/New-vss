from django.db import models
from django.conf import settings

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Technology', 'Technology'),
        ('Art', 'Art'),
        ('Cooking', 'Cooking'),
        ('Music', 'Music'),
        ('Other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('In Review', 'In Review'),
        ('Approved', 'Approved'),
        ('Hold', 'Hold'),
        ('Rejected', 'Rejected'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='skills')
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    certification = models.FileField(upload_to='certifications/', null=True, blank=False)
    certification_url = models.URLField(null=True, blank=True)  # Optional: store full URL
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='in review')

    def __str__(self):
        return f"{self.title} by {self.user.username}"

class SkillAnalytics(models.Model):
    skill = models.OneToOneField(Skill, on_delete=models.CASCADE, related_name='analytics')
    learners_count = models.PositiveIntegerField(default=0)
    average_rating = models.FloatField(default=0.0)

    def __str__(self):
        return f"Analytics for {self.skill.title}"