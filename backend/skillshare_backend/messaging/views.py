from rest_framework import generics, permissions
from .models import Messaging
from .serializers import MessagingSerializer

class MessagingListView(generics.ListAPIView):
    serializer_class = MessagingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Messaging.objects.filter(receiver=user).order_by('-timestamp')