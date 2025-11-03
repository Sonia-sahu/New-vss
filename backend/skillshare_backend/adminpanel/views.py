from rest_framework import generics, permissions, status
from rest_framework.response import Response
from skills.models import Skill
from users.models import User
from .models import ModerationLog
from .serializers import SkillModerationSerializer, UserManagementSerializer, ModerationLogSerializer

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin


class SkillModerationView(generics.UpdateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillModerationSerializer
    permission_classes = [IsAdminUser]

    def patch(self, request, *args, **kwargs):
        skill = self.get_object()
        action = request.data.get('action')
        reason = request.data.get('reason', '')

        if action == 'remove':
            skill.delete()
        elif action == 'approve':
            pass  # You can add approval logic here

        ModerationLog.objects.create(admin=request.user, skill=skill, action=action, reason=reason)
        return Response({'status': f'Skill {action}d'})


class UserManagementView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserManagementSerializer
    permission_classes = [IsAdminUser]


class ModerationLogView(generics.ListAPIView):
    queryset = ModerationLog.objects.all()
    serializer_class = ModerationLogSerializer
    permission_classes = [IsAdminUser]