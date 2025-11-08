from rest_framework import serializers
from skills.models import Skill
from users.models import User
from .models import ModerationLog


class SkillModerationSerializer(serializers.ModelSerializer):
    action = serializers.ChoiceField(choices=['approve', 'rejected', 'on_hold', 'remove'])
   
    error_messages={
        "invalid_choice": "Action must be one of: approve, rejected, on_hold, remove."
    }
    reason = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Skill
        fields = ['id', 'status', 'action', 'reason']

    def update(self, instance, validated_data):
        action = validated_data.get('action')
        reason = validated_data.get('reason', '')

        if action == 'remove':
            instance.delete()
        elif action in ['approve', 'rejected', 'on_hold']:
            instance.status = action
            instance.save()

        # Optionally log moderation here if needed
        return instance
class UserManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_admin']


class ModerationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModerationLog
        fields = ['id', 'admin', 'skill', 'action', 'reason', 'timestamp', 'skill_id']