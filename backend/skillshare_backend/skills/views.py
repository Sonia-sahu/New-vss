from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from .models import Skill, SkillAnalytics
from .serializers import SkillSerializer, SkillAnalyticsSerializer

# ✅ List or Create Skills
class SkillListCreateView(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# ✅ Retrieve, Update, or Delete a Skill
class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

    def get(self, request, *args, **kwargs):
        skill = self.get_object()
        if skill.user != request.user:
            raise PermissionDenied("You do not have permission to view this skill.")
        return super().get(request, *args, **kwargs)

# ✅ Skill Status Update (Only Admins)
class SkillStatusUpdateView(generics.UpdateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminUser]

    def get_serializer_context(self):
        return {'request': self.request}

    def update(self, request, *args, **kwargs):
        skill = self.get_object()
        status_value = request.data.get("status")

        if status_value and status_value in dict(Skill.STATUS_CHOICES).keys():
            skill.status = status_value
            skill.save()
            return Response(SkillSerializer(skill, context={'request': request}).data)
        return Response({"error": "Invalid status."}, status=status.HTTP_400_BAD_REQUEST)

# ✅ Fetch all skills for a given user (for public profile)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_skills(request, user_id):
    skills = Skill.objects.filter(user_id=user_id)
    serializer = SkillSerializer(skills, many=True, context={'request': request})
    return Response(serializer.data)

# ✅ Skill analytics
class SkillAnalyticsView(generics.RetrieveAPIView):
    queryset = SkillAnalytics.objects.all()
    serializer_class = SkillAnalyticsSerializer
    permission_classes = [IsAuthenticated]

# ✅ Create a new skill
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_skill(request):
    title = request.data.get('title')
    description = request.data.get('description')
    category = request.data.get('category')
    status_value = request.data.get('status')

    if not title or not description or not category or not status_value:
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    skill_data = {
        "title": title,
        "description": description,
        "category": category,
        "status": status_value,
        "user": request.user,
    }

    try:
        skill = Skill.objects.create(**skill_data)
        return Response(SkillSerializer(skill, context={'request': request}).data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ✅ Update an existing skill
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_skill(request, skill_id):
    skill = get_object_or_404(Skill, id=skill_id)

    if skill.user != request.user:
        return Response(
            {"error": "You do not have permission to edit this skill."},
            status=status.HTTP_403_FORBIDDEN
        )

    title = request.data.get('title')
    description = request.data.get('description')
    category = request.data.get('category')

    if not title or not description or not category:
        return Response({"error": "All fields (title, description, category) are required."}, status=status.HTTP_400_BAD_REQUEST)

    skill.title = title
    skill.description = description
    skill.category = category
    skill.save()

    serializer = SkillSerializer(skill, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

# ✅ Get distinct categories
@api_view(['GET'])
def get_skill_categories(request):
    categories = Skill.objects.values_list('category', flat=True).distinct()
    return Response({"categories": list(categories)}, status=status.HTTP_200_OK)

# ✅ Get all skills (optionally filtered by status)
@api_view(['GET'])
def get_all_skills(request):
    status_filter = request.query_params.get('status')
    if status_filter:
        skills = Skill.objects.filter(status=status_filter)
    else:
        skills = Skill.objects.all()

    serializer = SkillSerializer(skills, many=True, context={'request': request})
    return Response(serializer.data)