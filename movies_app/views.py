from django.shortcuts import render
from .models import Movie
import requests, json
from rest_framework import viewsets
from .serializers import *

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


def home(request):
    movie = {}
    if 'movie' in request.GET:
        result = request.GET['movie']
        result = result.title().replace(' ', '%20')
        url = f'https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&language=en-US&query={result}&page=1&include_adult=false'
        response = requests.get(url)
        movie = response.json()

def get_data(request, movie_id):
    query = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US'
    response = requests.get(query)
    if response.status_code == 200:
        array = response.json()

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer