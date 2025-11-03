from django.urls import path
from .views import SkillListCreateView, SkillDetailView, SkillAnalyticsView

urlpatterns = [
    path('', SkillListCreateView.as_view(), name='skill_list_create'),
    path('<int:pk>/', SkillDetailView.as_view(), name='skill_detail'),
    path('<int:pk>/analytics/', SkillAnalyticsView.as_view(), name='skill_analytics'),
]