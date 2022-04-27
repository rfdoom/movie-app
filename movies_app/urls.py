from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('movies', views.MovieViewSet)
router.register('users', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('result/', views.tmdb_data),
    path('result/<int:request>', views.movie_detail),
]