from rest_framework import serializers
from users.models import User
from skills.models import Skill
from .models import Follow

class UserExploreSerializer(serializers.ModelSerializer):
    skills = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'bio', 'expertise', 'skills']


class FollowSerializer(serializers.ModelSerializer):
    follower_username = serializers.ReadOnlyField(source='follower.username')
    following_username = serializers.ReadOnlyField(source='following.username')

    class Meta:
        model = Follow
        fields = ['id', 'follower', 'follower_username', 'following', 'following_username', 'followed_at']
        read_only_fields = ['id', 'followed_at', 'follower_username', 'following_username']