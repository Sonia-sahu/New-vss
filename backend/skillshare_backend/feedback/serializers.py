from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    reviewer_username = serializers.ReadOnlyField(source='reviewer.username')
    recipient_username = serializers.ReadOnlyField(source='recipient.username')

    class Meta:
        model = Feedback
        fields = [
            'id', 'reviewer', 'reviewer_username',
            'recipient', 'recipient_username',
            'workshop', 'rating', 'comment', 'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'reviewer_username', 'recipient_username']