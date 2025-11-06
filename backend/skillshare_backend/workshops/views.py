from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .models import Workshop, WorkshopRegistration
from .serializers import WorkshopSerializer, WorkshopRegistrationSerializer


class WorkshopListCreateView(generics.ListCreateAPIView):
    serializer_class = WorkshopSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        now = timezone.now()
        for workshop in Workshop.objects.filter(status='upcoming'):
            end_time = workshop.date + timedelta(minutes=workshop.duration_minutes)
            if now > end_time:
                workshop.status = 'completed'
                workshop.save()
        return Workshop.objects.all()

    def perform_create(self, serializer):
        enable_live_session = self.request.data.get('enable_live_session', False)
        meeting_room_name = self.request.data.get('meeting_room_name', '')
        meeting_url = self.request.data.get('meeting_url', '')

        if enable_live_session and not meeting_room_name:
            import time
            timestamp = int(time.time())
            meeting_room_name = f"workshop-{timestamp}"
            meeting_url = f"https://meet.jit.si/{meeting_room_name}"

        serializer.save(
            host=self.request.user,
            meeting_room_name=meeting_room_name,
            meeting_url=meeting_url
        )


class WorkshopDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkshopSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        workshop = super().get_object()
        now = timezone.now()
        end_time = workshop.date + timedelta(minutes=workshop.duration_minutes)
        if workshop.status == 'upcoming' and now > end_time:
            workshop.status = 'completed'
            workshop.save()

        if self.request.method in ['PUT', 'PATCH', 'DELETE'] and workshop.host != self.request.user:
            raise PermissionDenied("You do not have permission to modify this workshop.")
        return workshop

    def perform_update(self, serializer):
        enable_live_session = self.request.data.get('enable_live_session', False)
        meeting_room_name = self.request.data.get('meeting_room_name', '')
        meeting_url = self.request.data.get('meeting_url', '')

        if enable_live_session and not meeting_room_name:
            import time
            timestamp = int(time.time())
            meeting_room_name = f"workshop-{timestamp}"
            meeting_url = f"https://meet.jit.si/{meeting_room_name}"

        serializer.save(
            meeting_room_name=meeting_room_name,
            meeting_url=meeting_url
        )


class RegisterForWorkshopView(generics.CreateAPIView):
    queryset = WorkshopRegistration.objects.all()
    serializer_class = WorkshopRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        workshop_id = self.request.data.get('workshop')
        try:
            workshop = Workshop.objects.get(id=workshop_id)
            if workshop.status != 'upcoming':
                raise PermissionDenied("Registration is closed for this workshop.")
            serializer.save(user=self.request.user, workshop=workshop)
        except Workshop.DoesNotExist:
            raise PermissionDenied("Workshop not found.")


class MyWorkshopRegistrationsView(generics.ListAPIView):
    serializer_class = WorkshopRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkshopRegistration.objects.filter(user=self.request.user)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def mark_attended(request, workshop_id):
    try:
        registration = WorkshopRegistration.objects.get(
            workshop_id=workshop_id,
            user=request.user
        )
        registration.attended = True
        registration.save()
        return Response({"message": "Attendance marked successfully."}, status=status.HTTP_200_OK)
    except WorkshopRegistration.DoesNotExist:
        return Response({"error": "Registration not found."}, status=status.HTTP_404_NOT_FOUND)
