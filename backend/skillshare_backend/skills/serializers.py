from rest_framework import serializers
from .models import Skill, SkillAnalytics

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'user', 'title', 'description', 'category', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


class SkillAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillAnalytics
        fields = ['learners_count', 'average_rating']