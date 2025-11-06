from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
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
            ModerationLog.objects.create(admin=request.user, skill=skill, action=action, reason=reason)
            return Response({'status': 'Skill removed'}, status=status.HTTP_200_OK)

        elif action in ['approve', 'rejected', 'on_hold']:
            skill.status = action  # ✅ Update status field
            skill.save()
            ModerationLog.objects.create(admin=request.user, skill=skill, action=action, reason=reason)
            return Response({'status': f'Skill {action}d'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

class UserManagementView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserManagementSerializer(users, many=True)
        return Response(serializer.data)

    def put(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserManagementSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ModerationLogView(generics.ListAPIView):
    queryset = ModerationLog.objects.all()
    serializer_class = ModerationLogSerializer
    permission_classes = [IsAdminUser]