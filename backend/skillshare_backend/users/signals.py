# backend/skillshare_backend/users/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db import models
from notifications.utils import create_notification

User = get_user_model()

@receiver(post_save, sender=User)
def new_user_suggestions(sender, instance, created, **kwargs):
    if not created:
        return
    new_user = instance
    # Decide recipients for suggestion notifications.
    # Simple rule: notify up to 10 users with most followers (example)
    try:
        from community.models import Follow
        # count followers per user
        user_ids = (
            Follow.objects
            .values("following")
            .annotate(count=models.Count("follower"))
            .order_by("-count")
            .values_list("following", flat=True)[:10]
        )
        from django.contrib.auth import get_user_model
        UserModel = get_user_model()
        recipients = UserModel.objects.filter(id__in=user_ids).exclude(id=new_user.id)[:10]
        for r in recipients:
            content = f"New user {new_user.username} joined. You might want to follow them!"
            create_notification(r, "system", content)
    except Exception:
        # fallback: do nothing
        pass
