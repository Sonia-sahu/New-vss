# backend/skillshare_backend/workshops/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from workshops.models import Workshop
from django.contrib.auth import get_user_model
from notifications.utils import create_notification

User = get_user_model()

@receiver(post_save, sender=Workshop)
def notify_users_on_new_workshop(sender, instance, created, **kwargs):
    if not created:
        return

    content = f"New workshop '{instance.title}' is now open for registration!"
    recipients = User.objects.exclude(id=instance.host.id)

    for user in recipients:
        create_notification(user, "workshop", content)


