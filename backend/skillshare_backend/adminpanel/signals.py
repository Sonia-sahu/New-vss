# backend/skillshare_backend/adminpanel/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from skills.models import Skill
from django.contrib.auth import get_user_model
from notifications.utils import create_notification

User = get_user_model()

@receiver(post_save, sender=Skill)
def notify_admins_on_skill_creation(sender, instance, created, **kwargs):
    if not created:
        return

    creator = getattr(instance, 'created_by', None)
    if not creator:
        return  # skip if creator info is missing

    content = f"Skill '{instance.title}' created by {creator.username}."

    # Notify all staff/admin users
    admins = User.objects.filter(is_staff=True)
    for admin in admins:
        create_notification(admin, "system", content)
    
    
