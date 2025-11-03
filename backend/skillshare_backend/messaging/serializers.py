from rest_framework import serializers
from .models import Messaging

class MessagingSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')
    receiver_username = serializers.ReadOnlyField(source='receiver.username')

    class Meta:
        model = Messaging
        fields = ['id', 'sender', 'sender_username', 'receiver', 'receiver_username', 'content', 'timestamp', 'is_read']
        read_only_fields = ['id', 'timestamp', 'sender_username', 'receiver_username']