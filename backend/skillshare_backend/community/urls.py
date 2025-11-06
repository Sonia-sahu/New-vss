from django.urls import path
from . import views
from .views import list_users, follow_unfollow_user, profile_view
from .views import get_user_skills, post_tutorial, list_tutorials, user_tutorials

from .models import Follow

urlpatterns = [
    path('explore/', list_users, name='explore-users'),
    path('follow/<int:user_id>/', follow_unfollow_user, name='follow-unfollow'),
    path('profile/', profile_view, name='profile'),

    path('profile/<int:user_id>/', views.public_profile_view, name='public-profile'),
    path('is-following/<int:user_id>/', views.is_following_view, name='is-following'),  
  path('skills/<int:user_id>/', get_user_skills, name='user-skills'),  # Correct URL
   path('tutorials/', list_tutorials, name='list-tutorials'),
   path('tutorials/post/', post_tutorial, name='post-tutorial'),
   path('tutorials/user/<int:user_id>/', user_tutorials, name='user-tutorials'),


]


