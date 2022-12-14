                                  fcz             /////from re import T
from django.forms import ValidationError
from django.shortcuts import render
from .models import Movie, Review
import requests, random
from rest_framework import viewsets
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse


# To fetch a list of movies based on a keyword
# https://api.themoviedb.org/3/search/movie?api_key=<API_KEY>&query=<KEYWORD>

# To fetch more details about a movie
# https://api.themoviedb.org/3/movie/<MOVIE_ID>?api_key=<API_KEY>


# Create your views here.
TMDB_API_KEY = '673631b95bdadedc0122f4f13d0a8ce5'

WATCHMODE_API_KEY = 'y0IeErP6SKuGg0JauKEzL884XeqeQc80awqexTeD'

# TODO get csrf on and working with axios
# TODO pull from database if title already there
# Movie.objects.values_list('title', 'overview', 'release_date', 'image').get(title=titleCase
@csrf_exempt
def tmdb_data(request):
    titleCase = request.POST['search'].title()
    if Movie.objects.filter(title=titleCase).exists(): 
        print(Movie.objects.filter(title=titleCase).values())
        movie = list(Movie.objects.filter(title=titleCase).values())
        return JsonResponse(movie, safe=False)
    else:
        query = request.POST['search'].replace(' ', '%20')
        url = f'https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={query}>'
        response = requests.get(url)
        if response.status_code == 200:
            parse_json = response.json()
            print(parse_json)
            tmdb_id = parse_json['results'][0]['id']
            sources = watchmode_data(tmdb_id)
            mov = Movie(
                title = parse_json['results'][0]['title'],
                overview = parse_json['results'][0]['overview'],
                release_date = parse_json['results'][0]['release_date'],
                tmdb_id = parse_json['results'][0]['id'],
                image = parse_json['results'][0]['poster_path']  
            )
            mov.services.extend(sources)
            theTitle = mov.title
            mov.full_clean()
            mov.save()
            movie = list(Movie.objects.filter(title=theTitle).values())
            return JsonResponse(movie, safe=False)

def watchmode_data(request):
    sauce = []
    url = f'https://api.watchmode.com/v1/title/movie-{request}/details/?apiKey={WATCHMODE_API_KEY}&append_to_response=sources'
    print('request:', request, 'apikey:', WATCHMODE_API_KEY)
    response = requests.get(url)
    data = response.json()
    source = data['sources']
    for sou in source:
        if sou['name'] not in sauce:
            sauce.append(sou['name']) 
        else:
            continue
    return sauce

@csrf_exempt
def random_movie(request):
    movie = list(Movie.objects.order_by('?').values()[:1])
    return JsonResponse(movie[0], safe=False)

@csrf_exempt
def post_new_review(request):
    print(request)
    new_review = Review()
    new_review.author = request.POST['author']
    new_review.stars = request.POST['stars']
    new_review.comment = request.POST['comment']
    new_review.movie_id = request.POST['movie']
    new_review.full_clean()
    new_review.save()
    movie = request.POST['movie']
    reviews = list(Review.objects.filter(movie_id=movie).values())
    return HttpResponse(reviews)

    


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,  ]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer