from rest_framework import generics, permissions, filters
from users.models import User
from skills.models import Skill
from .models import Follow
from .serializers import UserExploreSerializer, FollowSerializer
from rest_framework.exceptions import PermissionDenied

# Explore users and their skills
class ExploreUsersView(generics.ListAPIView):
    queryset = User.objects.prefetch_related('skills').all()
    serializer_class = UserExploreSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'expertise', 'skills__title']


# Follow a user
class FollowUserView(generics.CreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        following_id = self.request.data.get('following')
        if int(following_id) == self.request.user.id:
            raise PermissionDenied("You cannot follow yourself.")
        serializer.save(follower=self.request.user)


# Unfollow a user
class UnfollowUserView(generics.DestroyAPIView):
    queryset = Follow.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        following_id = self.kwargs['following_id']
        return Follow.objects.get(follower=self.request.user, following_id=following_id)
