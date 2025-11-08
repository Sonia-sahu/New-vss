import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import User
from skills.models import Skill
from django.core.files.uploadedfile import SimpleUploadedFile

pytestmark = pytest.mark.django_db  # ✅ Enables DB access for all tests

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    def make_user(**kwargs):
        return User.objects.create_user(**kwargs)
    return make_user

@pytest.fixture
def get_tokens(api_client, create_user):
    def token(user_data):
        user = create_user(**user_data)
        response = api_client.post(reverse("token_obtain_pair"), data=user_data)
        return response.data["access"], user
    return token

def test_create_skill_with_certification(api_client, get_tokens):
    token, user = get_tokens({"email": "skilluser@example.com", "password": "Skill@1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    file = SimpleUploadedFile("cert.pdf", b"dummy content", content_type="application/pdf")
    payload = {
        "title": "Python Basics",
        "description": "Learn Python fundamentals",
        "category": "Technology",
        "certification": file,
        "certification_url": "http://example.com/cert.pdf",  # Optional but safe to include
        "status": "In Review"  # Optional if default is set
    }

    response = api_client.post(
        reverse("create-skill"),
        data=payload,
        format="multipart"
    )
    print(response.data)  # Debug output
    assert response.status_code == 201
    print(response.data)  # Optional: Debug output
    assert response.status_code == 201

def test_get_skill_list(api_client, get_tokens):
    token, _ = get_tokens({"email": "list@example.com", "password": "List@1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    response = api_client.get(reverse("skill-list-create"))
    assert response.status_code == 200

def test_get_skill_detail(api_client, get_tokens):
    token, user = get_tokens({"email": "detail@example.com", "password": "Detail@1234"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    skill = Skill.objects.create(
        user=user,
        title="Django",
        description="Web framework",
        category="Technology",
        certification_url="http://example.com/cert.pdf"
    )

    response = api_client.get(reverse("skill-detail", args=[skill.id]))
    assert response.status_code == 200