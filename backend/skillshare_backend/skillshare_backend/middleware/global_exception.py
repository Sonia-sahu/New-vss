import logging
import traceback
from django.http import JsonResponse
from django.core.exceptions import (
    ValidationError, PermissionDenied, ObjectDoesNotExist
)
from django.db import IntegrityError
from rest_framework.exceptions import (
    AuthenticationFailed, NotAuthenticated, APIException
)

logger = logging.getLogger(__name__)

class GlobalExceptionMiddleware:
    """
    Combined middleware for handling exceptions and status code responses.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)

            # Handle known error status codes
            if response.status_code >= 400:
                return self.process_status_code(response.status_code)

            return response

        except ValidationError as e:
            logger.warning(f"Validation Error: {e}")
            return JsonResponse({"error": "Validation failed", "details": str(e)}, status=400)

        except AuthenticationFailed as e:
            logger.warning(f"Authentication Failed: {e}")
            return JsonResponse({"error": "Authentication failed", "details": str(e)}, status=401)

        except NotAuthenticated as e:
            logger.warning(f"Not Authenticated: {e}")
            return JsonResponse({"error": "Authentication required", "details": str(e)}, status=401)

        except PermissionDenied as e:
            logger.warning(f"Permission Denied: {e}")
            return JsonResponse({"error": "Access forbidden", "details": str(e)}, status=403)

        except ObjectDoesNotExist as e:
            logger.warning(f"Object Not Found: {e}")
            return JsonResponse({"error": "Not found", "details": str(e)}, status=404)

        except IntegrityError as e:
            logger.error(f"Database Integrity Error: {e}")
            return JsonResponse({"error": "Database conflict", "details": str(e)}, status=409)

        except APIException as e:
            logger.error(f"API Exception: {e}")
            return JsonResponse({"error": "API Error", "details": str(e)}, status=e.status_code)

        except Exception as e:
            logger.critical(f"Unhandled Exception: {e}")
            logger.debug(traceback.format_exc())
            return JsonResponse({
                "error": "Internal server error",
                "details": str(e),
                "handled_by": "GlobalExceptionMiddleware"
            }, status=500)

    def process_status_code(self, status_code):
        response_messages = {
            400: 'Bad request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not found',
            409: 'Conflict',
            500: 'Internal server error',
            418: "I'm a teapot",
        }
        return JsonResponse(
            {'error': response_messages.get(status_code, 'An error occurred')},
            status=status_code
        )
