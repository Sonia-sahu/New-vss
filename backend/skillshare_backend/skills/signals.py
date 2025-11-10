from django.db.models.signals import post_save
from django.dispatch import receiver
from skills.models import Skill
from django.contrib.auth import get_user_model
from notifications.utils import create_notification
from django.db import models  # for Q filtering
@receiver(post_save, sender=Skill)
def notify_admins_on_skill_creation(sender, instance, created, **kwargs):
    if not created:
        return

    creator = instance.user
    content = f"Skill '{instance.title}' created by {creator.username} (ID: {creator.id})."

    User = get_user_model()
    admins = User.objects.filter(models.Q(is_admin=True) | models.Q(is_superuser=True))

    for admin in admins:
        create_notification(admin, "system", content)
