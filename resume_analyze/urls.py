from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path("analyze/", views.analyze_resume, name="analyze_resume"),
    # path("test-ai/", views.test_ai, name="test_ai"),
]