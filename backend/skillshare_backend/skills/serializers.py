from rest_framework import serializers
from .models import Skill, SkillAnalytics

class SkillSerializer(serializers.ModelSerializer):
    certification_url = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = [
            'id', 'user', 'title', 'description', 'category',
            'created_at', 'certification', 'status', 'certification_url'
        ]
        read_only_fields = ['id', 'user', 'created_at']

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