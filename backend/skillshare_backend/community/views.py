from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import Follow
from django.shortcuts import get_object_or_404
from .models import Tutorial
from .serializers import TutorialSerializer
from .serializers import UserExploreSerializer
from django.contrib.auth.models import User
from notifications.utils import create_notification
from skills.models import Skill  # ✅ Import Skill model from the skills app
from skills.serializers import SkillSerializer  # Import the SkillSerializer from the 'skills' app

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users(request):
    """List all users except the logged-in one, and show follow status"""
    current_user = request.user
    users = User.objects.exclude(id=current_user.id)
    serializer = UserExploreSerializer(users, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_unfollow_user(request, user_id):
    """Toggle follow/unfollow"""
    current_user = request.user

    if current_user.id == user_id:
        return Response({'error': "You can't follow yourself"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        target_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    follow_obj = Follow.objects.filter(follower=current_user, following=target_user)

    if follow_obj.exists():
        follow_obj.delete()
        return Response({'message': 'Unfollowed successfully', 'is_following': False})
    else:
        Follow.objects.create(follower=current_user, following=target_user)
        return Response({'message': 'Followed successfully', 'is_following': True})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def followers_list(request):
    """List all followers of current user"""
    followers = Follow.objects.filter(following=request.user).select_related('follower')
    data = [{'id': f.follower.id, 'username': f.follower.username} for f in followers]
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def following_list(request):
    """List all users the current user is following"""
    following = Follow.objects.filter(follower=request.user).select_related('following')
    data = [{'id': f.following.id, 'username': f.following.username} for f in following]
    return Response(data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    followers = Follow.objects.filter(following=user).select_related('follower')
    following = Follow.objects.filter(follower=user).select_related('following')

    data = {
        'id': user.id,
        'username': user.username,
        'bio': getattr(user, 'bio', ''),
        'expertise': getattr(user, 'expertise', ''),
        'followers': [{'id': f.follower.id, 'username': f.follower.username} for f in followers],
        'following': [{'id': f.following.id, 'username': f.following.username} for f in following],
    }
    return Response(data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def public_profile_view(request, user_id):
    user = get_object_or_404(User, id=user_id)
    followers = Follow.objects.filter(following=user).select_related('follower')
    following = Follow.objects.filter(follower=user).select_related('following')

    data = {
        'id': user.id,
        'username': user.username,
        'bio': getattr(user, 'bio', ''),
        'expertise': getattr(user, 'expertise', ''),
        'followers': [{'id': f.follower.id, 'username': f.follower.username} for f in followers],
        'following': [{'id': f.following.id, 'username': f.following.username} for f in following],
    }
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_following_view(request, user_id):
    """Check if the current user is following the given user"""
    current_user = request.user

    if current_user.id == user_id:
        return Response({'error': "You can't follow yourself"}, status=status.HTTP_400_BAD_REQUEST)

    target_user = get_object_or_404(User, id=user_id)
    is_following = Follow.objects.filter(follower=current_user, following=target_user).exists()

    return Response({'is_following': is_following})

# ✅ Fetch all skills for a specific user (from the 'skills' app)
class UserSkillsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user_skills = Skill.objects.filter(user_id=user_id)
            skills_data = [
                {
                    "id": skill.id,
                    "title": skill.title,
                    "description": skill.description,
                    "category": skill.category,
                    "created_at": skill.created_at,
                    "status": skill.status,
                }
                for skill in user_skills
            ]
            return Response(skills_data)

        except Skill.DoesNotExist:
            return Response({"error": "Skills not found for this user."}, status=404)

        except Exception as e:
            return Response({"error": str(e)}, status=500)


# ✅ Fetch all skills for a specific user (alternative version with a serializer)
@api_view(['GET'])
def get_user_skills(request, user_id):
    """Fetch all skills for a given user"""
    skills = Skill.objects.filter(user_id=user_id)
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_tutorial(request):
    """Mentor posts a new tutorial"""
    serializer = TutorialSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(posted_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_tutorials(request):
    """List all tutorials"""
    tutorials = Tutorial.objects.all().order_by('-created_at')
    serializer = TutorialSerializer(tutorials, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_tutorials(request, user_id):
    """List tutorials posted by a specific user"""
    tutorials = Tutorial.objects.filter(posted_by__id=user_id).order_by('-created_at')
    serializer = TutorialSerializer(tutorials, many=True)
    return Response(serializer.data)