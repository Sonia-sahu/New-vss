from django.urls import path
from .views import SkillListCreateView, SkillDetailView,  SkillAnalyticsView, SkillStatusUpdateView,update_skill
from . import views
urlpatterns = [
    path('', SkillListCreateView.as_view(), name='skill-list-create'),
    path('<int:pk>/', SkillDetailView.as_view(), name='skill-detail'),
    path('user/<int:user_id>/', views.get_user_skills, name='user-skills'),
    path('analytics/<int:pk>/', SkillAnalyticsView.as_view(), name='skill-analytics'),
    path('status-update/<int:pk>/', SkillStatusUpdateView.as_view(), name='skill-status-update'),
    path('create/', views.create_skill, name='create-skill'),  # For skill creation

    path('categories/', views.get_skill_categories, name='get-skill-categories'),
    path('skills/<int:skill_id>/edit/', update_skill, name='update-skill'),
    path('all/', views.get_all_skills, name='get-all-skills'),
]


