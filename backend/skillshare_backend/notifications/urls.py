from django.urls import path
from .views import (
    NotificationListView,
    MarkNotificationReadView,
    list_notifications,
    mark_all_read,
    unread_count
)

urlpatterns = [
    path('', list_notifications, name='list-notifications'),                 # GET - all notifications
    path('mark-read/<int:pk>/', MarkNotificationReadView.as_view(), name='mark-notification-read'),  # PATCH single
    path('mark-all-read/', mark_all_read, name='mark-all-read'),  
    path('unread-count/',unread_count, name='unread-count'),  #  add this line
            # POST - mark all read
]
