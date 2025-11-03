from django.db import models
from django.conf import settings
from workshops.models import Workshop

class Feedback(models.Model):
    reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='given_feedback')
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_feedback')
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name='feedbacks', null=True, blank=True)
    rating = models.PositiveIntegerField()  # e.g., 1 to 5
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.reviewer.username} → {self.recipient.username} ({self.rating})"