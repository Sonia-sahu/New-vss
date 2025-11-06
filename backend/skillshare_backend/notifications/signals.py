from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .utils import create_notification

User = get_user_model()

@receiver(post_save, sender=User)
def notify_users_new_user(sender, instance, created, **kwargs):
    """
    When a new user registers, suggest them to others via notification.
    """
    if created:
        print(f" New user joined: {instance.username}")
        existing_users = User.objects.exclude(id=instance.id)
        for u in existing_users:
            create_notification(
                recipient_user=u,
                notif_type="suggestion",
                content=f"New user {instance.username} joined! You might want to follow them."
            )
        print(f"✅ Sent suggestions to {existing_users.count()} users")
