from django.urls import path
from .views import (
    RegisterUserView,
    UserProfileView,
    UserSettingsView,
    CustomTokenObtainPairView,
)
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("settings/", UserSettingsView.as_view(), name="settings"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

]