from django.urls import path
from .views import (
    RegisterUserView,
    UserProfileView,
    UserSettingsView,
    CustomTokenObtainPairView,ResetPasswordView,ForgotPasswordView
)
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("settings/", UserSettingsView.as_view(), name="settings"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
      
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),

    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),

]