from django.urls import path
from .views import (
    WorkshopListCreateView,
    WorkshopDetailView,
    RegisterForWorkshopView,
    MyWorkshopRegistrationsView
)

urlpatterns = [
    path('', WorkshopListCreateView.as_view(), name='workshop_list_create'),
    path('<int:pk>/', WorkshopDetailView.as_view(), name='workshop_detail'),
    path('register/', RegisterForWorkshopView.as_view(), name='workshop_register'),
    path('my-registrations/', MyWorkshopRegistrationsView.as_view(), name='my_workshop_registrations'),
]
