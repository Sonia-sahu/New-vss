
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import messages.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'skillshare_backend.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            messages.routing.websocket_urlpatterns
        )
    ),
})