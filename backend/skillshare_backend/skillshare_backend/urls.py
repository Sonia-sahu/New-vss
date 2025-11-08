from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from skillshare_backend import views
from django.conf import settings
from django.conf.urls.static import static
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

     path('test-404/', views.test_404_view, name='test_404'),
    path('test-400/', views.test_400_view, name='test_400'),
    path('test-500/', views.test_500_view, name='test_500'),
    path('test-permission-denied/', views.test_permission_denied_view, name='test_permission_denied'),
    path('test-suspicious-operation/', views.test_suspicious_operation_view, name='test_suspicious_operation'),
    # Include other URLs as needed
]

# ✅ Serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)