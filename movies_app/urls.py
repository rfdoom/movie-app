from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('movie', views.MovieViewSet)


urlpatterns = [
    path('', views.home, name='home')
]