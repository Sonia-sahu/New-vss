import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import User

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user(db):
    def make_user(**kwargs):
        return User.objects.create_user(**kwargs)
    return make_user

@pytest.fixture
def get_tokens(api_client, create_user):
    def token(user_data):
        create_user(**user_data)
        response = api_client.post(reverse("token_obtain_pair"), data=user_data)
        return response.data["access"]
    return token

@pytest.mark.django_db  # ✅ This enables DB access

def test_user_registration(api_client):
    url = reverse("register")
    payload = {
        "email": "testuser@example.com",
        "password": "Test@1234"
    }
    response = api_client.post(url, payload)
    assert response.status_code == 201

def test_user_login(api_client, create_user):
    user_data = {"email": "loginuser@example.com", "password": "Login@1234"}
    create_user(**user_data)
    response = api_client.post(reverse("token_obtain_pair"), data=user_data)
    assert response.status_code == 200
    assert "access" in response.data

def test_user_profile_authenticated(api_client, get_tokens):
    token = get_tokens({"email": "profile@example.com", "password": "Profile@1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    response = api_client.get(reverse("profile"))
    assert response.status_code == 200

def test_user_settings(api_client, get_tokens):
    token = get_tokens({"email": "settings@example.com", "password": "Settings@1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    response = api_client.get(reverse("settings"))
    assert response.status_code == 200
