# 🌊 SkillHarbor

**SkillHarbor** is designed to foster learning and interaction among users by allowing them to share their expertise in various fields, such as coding, photography, and cooking. It integrates community features such as messaging and feedback to establish connections based on interests or skills. Admins ensure the quality of skills offered, and the system is built with security, scalability, and ease of use in mind.

---

## 🚀 Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Frontend | React (Vite) + Material UI (MUI)        |
| Backend  | Django + Django REST Framework (DRF)    |
| Auth     | JWT (JSON Web Tokens)                   |
| Realtime | Django Channels + WebSockets            |
| Video    | Jitsi Meet (group) + ZEGOCLOUD (1-on-1) |
| Database | MYSQL (or SQLite for dev)               |

---

## 🧩 Features

### 👤 User & Profile

- Custom user model with email-based login
- JWT authentication for secure API access
- Profile picture, bio, expertise, and mentor/admin flags
- Privacy and notification settings

### 🧠 Skills & Workshops

- Users can create and manage skills with certifications
- Skill moderation and analytics (ratings, learners)
- Host or join workshops with:
  - 🎥 **Jitsi Meet** for live group sessions
  - 📞 **ZEGOCLOUD** for one-on-one mentoring
- Workshop registration and attendance tracking

### 💬 Real-Time Chat

- One-on-one chat system using **WebSockets**
- Powered by **Django Channels**
- Real-time messaging with timestamps and chat history

### 🌟 Feedback & Social

- Leave structured feedback on workshops and users
- Follow/unfollow other users
- Watch tutorials posted by mentors

---

## 🗂 Project Structure

backend/
├── skillshare_backend/
│ ├── manage.py
│ ├── pytest.ini
│ ├── requirements.txt
│ ├── adminpanel/
│ │ ├── **init**.py
│ │ ├── admin.py
│ │ ├── apps.py
│ │ ├── models.py
│ │ ├── serializers.py
│ │ ├── tests.py
│ │ ├── urls.py
│ │ └── views.py
│ ├── community/
│ ├── feedback/
│ ├── media/
│ ├── messaging/
│ ├── notifications/
│ ├── profile_pics/
│ ├── skills/
│ ├── skillshare_backend/
│ ├── tests/
│ ├── users/
│ └── workshops/

frontend/
├── skillshare/
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── package.json
│ ├── README.md
│ ├── vite.config.js
│ ├── public/
│ └── src/
├── features/
│ ├── adminpanel/
│ │ └── actions/
│ ├── auth/
│ │ └── actions/
│ ├── feedback/
│ │ └── actions/
│ ├── messages/
│ │ └── actions/
│ ├── notifications/
│ │ └── actions/
│ ├── skills/
│ │ ├── actions/
│ │ └── components/
│ └── workshops/
│ └── actions/
└── services/

---

## ⚙️ Setup Instructions

### 🔧 Backend (Django + DRF + Channels)

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Apply migrations

python manage.py migrate

## Create superuser

python manage.py createsuperuser

## Run development server

daphne skillharbor.asgi:application

# Frontend (React + Vite + MUI)

## Install dependencies

npm install

## Run dev server

npm run dev

# 🔐 Authentication

JWT-based login and token refresh

Secure API access via Authorization headers

Role-based access for mentors and admins

# 📡 Real-Time Communication

WebSocket chat using Django Channels

Jitsi Meet integration for group workshops

ZEGOCLOUD integration for private 1-on-1 video calls
