from rest_framework import serializers
from .models import Workshop, WorkshopRegistration

class WorkshopSerializer(serializers.ModelSerializer):
    host_username = serializers.ReadOnlyField(source='host.username')

    class Meta:
        model = Workshop
        fields = [
            'id', 'host', 'host_username', 'title', 'description',
            'skill', 'date', 'duration_minutes', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'host', 'created_at', 'host_username']


class WorkshopRegistrationSerializer(serializers.ModelSerializer):
    workshop_title = serializers.ReadOnlyField(source='workshop.title')
    user_username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = WorkshopRegistration
        fields = ['id', 'workshop', 'workshop_title', 'user', 'user_username', 'registered_at', 'attended']
        read_only_fields = ['id', 'registered_at', 'workshop_title', 'user_username']