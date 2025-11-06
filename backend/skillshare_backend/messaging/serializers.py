from rest_framework import serializers
from .models import Message
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['sender', 'content', 'timestamp']

    def get_sender(self, obj):
        if obj.sender:
            return {"id": obj.sender.id, "username": obj.sender.username}
        return {"id": None, "username": "Unknown"}

