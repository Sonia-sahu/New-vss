from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Users app
    path('api/users/', include('users.urls')),

    # Other feature apps
    path('api/skills/', include('skills.urls')),
    path('api/workshops/', include('workshops.urls')),
    path('api/message/', include('messaging.urls')),
    path('api/feedback/', include('feedback.urls')),
    path('api/community/', include('community.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/adminpanel/', include('adminpanel.urls')),

    # ✅ JWT Authentication endpoints
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]