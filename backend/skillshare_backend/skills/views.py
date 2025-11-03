from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Skill, SkillAnalytics
from .serializers import SkillSerializer, SkillAnalyticsSerializer

class SkillListCreateView(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        skill = super().get_object()
        if skill.user != self.request.user:
            raise PermissionDenied("You do not have permission to access this skill.")
        return skill


class SkillAnalyticsView(generics.RetrieveAPIView):
    queryset = SkillAnalytics.objects.all()
    serializer_class = SkillAnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated]