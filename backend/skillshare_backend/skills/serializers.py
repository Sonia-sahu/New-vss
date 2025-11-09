from rest_framework import serializers
from .models import Skill, SkillAnalytics
from adminpanel.models import ModerationLog
class SkillSerializer(serializers.ModelSerializer):
    certification_url = serializers.SerializerMethodField()
    moderation_reason = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = [
            'id', 'user', 'title', 'description', 'category',
            'created_at', 'certification', 'status', 'certification_url', 
            'moderation_reason'
        ]
        read_only_fields = ['id', 'user', 'created_at']

    def get_moderation_reason(self, obj):
        log = ModerationLog.objects.filter(skill=obj).order_by('-timestamp').first()
        return log.reason if log else None

    def get_certification_url(self, obj):
        request = self.context.get('request')
        if obj.certification and request:
            return request.build_absolute_uri(obj.certification.url)
        return None

    def validate_certification(self, value):
        """Ensure the uploaded file is a PDF"""
        if value and hasattr(value, 'content_type') and value.content_type != 'application/pdf':
            raise serializers.ValidationError('Only PDF files are allowed for certification.')
        return value

class SkillAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillAnalytics
        fields = ['learners_count', 'average_rating']