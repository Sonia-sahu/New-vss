from rest_framework import serializers
from skills.models import Skill
from users.models import User
from .models import ModerationLog

class SkillModerationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'title', 'description', 'category', 'user']


class UserManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_admin']


class ModerationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModerationLog
        fields = ['id', 'admin', 'skill', 'action', 'reason', 'timestamp']