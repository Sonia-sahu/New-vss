from .models import Notification

def create_notification(recipient_user, notif_type, content):
    """
    Create a notification record for a specific user.
    """
    try:
        notif = Notification.objects.create(
            user=recipient_user,
            type=notif_type,
            content=content
        )
        return notif
    except Exception as e:
        print(f"Notification creation failed: {e}")
        return None
