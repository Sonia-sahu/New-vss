from django.urls import path
from .views import SubmitFeedbackView, ReceivedFeedbackListView

urlpatterns = [
    path('submit/', SubmitFeedbackView.as_view(), name='submit_feedback'),
    path('received/', ReceivedFeedbackListView.as_view(), name='received_feedback'),
]