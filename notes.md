Make database 'movies'.
make virtual environment. activate environment
pip3 install django and djangorestframework
django-admin startproject and startapp

requests from TMDB (replace movie_id and api_key with something):
api request for movie: https://api.themoviedb.org/3/movie/<movie_id>?api_key=<api_key>&language=en-US
api request for tv show: https://api.themoviedb.org/3/tv/<tv_id>?api_key=<api_key>&language=en-US

to get authorization token: 'python3 manage.py drf_create_token (username)'
get it and slap in the register function on the Login.js page