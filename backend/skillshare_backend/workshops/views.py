from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Workshop, WorkshopRegistration
from .serializers import WorkshopSerializer, WorkshopRegistrationSerializer

class WorkshopListCreateView(generics.ListCreateAPIView):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)


class WorkshopDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        workshop = super().get_object()
        if workshop.host != self.request.user:
            raise PermissionDenied("You do not have permission to modify this workshop.")
        return workshop


class RegisterForWorkshopView(generics.CreateAPIView):
    queryset = WorkshopRegistration.objects.all()
    serializer_class = WorkshopRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyWorkshopRegistrationsView(generics.ListAPIView):
    serializer_class = WorkshopRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkshopRegistration.objects.filter(user=self.request.user)