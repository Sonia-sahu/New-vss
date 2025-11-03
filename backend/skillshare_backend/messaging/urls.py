from django.urls import path
from .views import MessagingListView

urlpatterns = [
    path('', MessagingListView.as_view(), name='message_list'),
]