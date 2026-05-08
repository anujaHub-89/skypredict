from django.urls import path
from .views import index   # ✅ IMPORTANT CHANGE

urlpatterns = [
    path('', index, name='home'),
]