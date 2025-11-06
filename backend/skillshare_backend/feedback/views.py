from rest_framework import generics, permissions
from .models import Feedback
from .serializers import FeedbackSerializer
from workshops.models import Workshop

class SubmitFeedbackView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        workshop_id = self.request.data.get("workshopId")
        try:
            workshop = Workshop.objects.get(id=workshop_id)
        except Workshop.DoesNotExist:
            workshop = None

        serializer.save(
            reviewer=self.request.user,
            workshop=workshop
        )


class ReceivedFeedbackListView(generics.ListAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Feedback.objects.filter(recipient=self.request.user)