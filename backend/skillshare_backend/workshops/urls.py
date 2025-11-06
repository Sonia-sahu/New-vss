from django.urls import path
from .views import (
    WorkshopListCreateView,
    WorkshopDetailView,
    RegisterForWorkshopView,
    MyWorkshopRegistrationsView,
    mark_attended,
)

urlpatterns = [
    path('', WorkshopListCreateView.as_view(), name='workshop_list_create'),
    path('<int:pk>/', WorkshopDetailView.as_view(), name='workshop_detail'),
    path('register/', RegisterForWorkshopView.as_view(), name='workshop_register'),
    path('my-registrations/', MyWorkshopRegistrationsView.as_view(), name='my_workshop_registrations'),
     path('<int:workshop_id>/attend/', mark_attended, name='mark_attended'),  # ✅ New route
]
