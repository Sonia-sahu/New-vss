from django.urls import path
from .views import SkillModerationView, UserManagementView, ModerationLogView

urlpatterns = [
    path('skills/<int:pk>/moderate/', SkillModerationView.as_view(), name='moderate_skill'),
    path('users/', UserManagementView.as_view(), name='manage_users'),
    path('logs/', ModerationLogView.as_view(), name='moderation_logs'),
]
