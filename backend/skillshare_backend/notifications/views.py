from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated
# --------------------------------------------------
# CLASS-BASED VIEWS
# --------------------------------------------------

class NotificationListView(generics.ListAPIView):
    """
    Returns all notifications for the logged-in user
    """
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')


class MarkNotificationReadView(generics.UpdateAPIView):
    """
    Marks a single notification as read
    """
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        notification = super().get_object()
        if notification.user != self.request.user:
            raise PermissionDenied("You cannot modify this notification.")
        return notification

    def patch(self, request, *args, **kwargs):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response({'status': 'marked as read'}, status=status.HTTP_200_OK)

# --------------------------------------------------
# FUNCTION-BASED VIEWS
# --------------------------------------------------

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def list_notifications(request):
    """
    Alternate function-based endpoint to fetch notifications
    """
    notifications = Notification.objects.filter(user=request.user).order_by('-created_at')
    data = [
        {
            "id": n.id,
            "type": n.type,
            "content": n.content,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat(),
        }
        for n in notifications
    ]
    return Response(data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_all_read(request):
    """
    Mark all notifications as read for the current user
    """
    Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
    return Response({"message": "All notifications marked as read."}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unread_count(request):
    """Return the count of unread notifications for the current user."""
    count = Notification.objects.filter(user=request.user, is_read=False).count()
    return Response({"unread_count": count})
