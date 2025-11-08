from django.http import  JsonResponse
from django.core.exceptions import PermissionDenied
def test_404_view(request):
    # Simulate a 404 error
    return JsonResponse({'error': 'Not found'}, status=404)
def test_400_view(request):
    # Simulate a 400 error
    return JsonResponse({'error': 'Bad request'}, status=400)
def test_500_view(request):
    # Simulate a server error
    raise Exception("Test server error")
def test_permission_denied_view(request):
    # Simulate permission denied
    raise PermissionDenied
def test_suspicious_operation_view(request):
    # Simulate suspicious operation
    return JsonResponse({'error': 'Suspicious operation detected'}, status=400)
def custom_page_not_found(request, exception):
    return JsonResponse({'error': 'Page not found'}, status=404)
def custom_server_error(request):
    return JsonResponse({'error': 'Internal server error'}, status=500)
def custom_bad_request(request, exception):
    return JsonResponse({'error': 'Bad request'}, status=400)
def custom_permission_denied(request, exception):
    return JsonResponse({'error': 'Permission denied'}, status=403)