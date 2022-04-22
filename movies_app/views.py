from django.shortcuts import render
from django.http import HttpResponse
from .models import Movie
import requests, json
from rest_framework import viewsets
from .serializers import *
from django.contrib.auth.models import User

# To fetch a list of movies based on a keyword
# https://api.themoviedb.org/3/search/movie?api_key=<API_KEY>&query=<KEYWORD>

# To fetch more details about a movie
# https://api.themoviedb.org/3/movie/<MOVIE_ID>?api_key=<API_KEY>


# Create your views here.
TMDB_API_KEY = ''

WATCHMODE_API_KEY = ''
WATCHMODE_SEARCH_FIELD = ''
WATCHMODE_SEARCH_VALUE = ''
WATCHMODE_BASE_PATH = f'https://api.watchmode.com/v1/search/?apikey={WATCHMODE_API_KEY}&search_field={WATCHMODE_SEARCH_FIELD}&search_value={WATCHMODE_SEARCH_VALUE}'


def tmdb_data(request, movie_id):
    query = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US'
    response = requests.get(query)
    if response.status_code == 200:
        data = response.json()
        parse_json = json.loads(data)
        parse_json[0]['title'] = Movie(
            title = parse_json[0]['title'],
            overview = parse_json[0]['overview'],
            release_date = parse_json[0]['release_date'],
            tmdb_id = parse_json[0]['id']
        )
        tmdb_id = parse_json[0]['id']
        watchmode_data(tmdb_id)
        parse_json[0]['title'].save()

# def watchmode_data(request, tmdb_id):
#     sauce = []
#     query = f'https://api.watchode.com/v1/title/{tmdb_id}/details/?apikey={WATCHMODE_API_KEY}'
#     response = requests.get(query)
#     data = response.text
#     parse_json = json.loads(data)
#     sources = parse_json['sources']
#     for source in sources:


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer