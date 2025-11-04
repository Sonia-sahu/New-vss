from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Workshop, WorkshopRegistration
from .serializers import WorkshopSerializer, WorkshopRegistrationSerializer

class WorkshopListCreateView(generics.ListCreateAPIView):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Auto-generate meeting room name and URL if live session is enabled
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
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        workshop = super().get_object()
        # Allow read access to all authenticated users
        if self.request.method in ['PUT', 'PATCH', 'DELETE'] and workshop.host != self.request.user:
            raise PermissionDenied("You do not have permission to modify this workshop.")
        return workshop
    
    def perform_update(self, serializer):
        # Auto-generate meeting room name and URL if live session is enabled and not provided
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
        print("Incoming data:", self.request.data)
        workshop_id = self.request.data.get('workshop')
        
        try:
            workshop = Workshop.objects.get(id=workshop_id)
            # Check if registration is still open (workshop is upcoming)
            if workshop.status != 'upcoming':
                raise PermissionDenied("Registration is closed for this workshop.")
            serializer.save(user=self.request.user)
        except Workshop.DoesNotExist:
            raise PermissionDenied("Workshop not found.")


class MyWorkshopRegistrationsView(generics.ListAPIView):
    serializer_class = WorkshopRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkshopRegistration.objects.filter(user=self.request.user)