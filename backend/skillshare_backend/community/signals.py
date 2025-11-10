# backend/skillshare_backend/community/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Follow
from django.conf import settings
from notifications.utils import create_notification

@receiver(post_save, sender=Follow)
def follow_created_notify(sender, instance, created, **kwargs):
    if not created:
        return
    follower = instance.follower
    following = instance.following  # the user being followed

    content = f"{follower.username} started following you."
    create_notification(following, "follow", content)

