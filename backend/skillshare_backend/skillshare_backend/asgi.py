import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import messages.routing
import notifications.routing  # ✅ Added for notifications

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'skillshare_backend.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            messages.routing.websocket_urlpatterns +
            notifications.routing.websocket_urlpatterns  # ✅ Include both message + notification routes
        )
    ),
})
