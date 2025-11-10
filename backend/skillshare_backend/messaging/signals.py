# backend/skillshare_backend/messages/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from messaging.models import Message
from notifications.utils import create_notification

@receiver(post_save, sender=Message)
def notify_receiver_on_message(sender, instance, created, **kwargs):
    if not created:
        return

    sender_user = instance.sender
    chat = instance.chat

    # Determine the receiver
    receiver_user = chat.user1 if chat.user2 == sender_user else chat.user2

    # Create a system notification for the receiver
    content = f"You received a new message from {sender_user.username}."
    create_notification(receiver_user, "message", content)

    
