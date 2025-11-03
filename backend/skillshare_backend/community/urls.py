from django.urls import path
from .views import ExploreUsersView, FollowUserView, UnfollowUserView

urlpatterns = [
    path('explore/', ExploreUsersView.as_view(), name='explore_users'),
    path('follow/', FollowUserView.as_view(), name='follow_user'),
    path('unfollow/<int:following_id>/', UnfollowUserView.as_view(), name='unfollow_user'),
]