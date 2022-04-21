from rest_framework import serializers
from .models import *

# used to convert complex data to Python datatypes that can then be rendered into JSON
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['title', 'overview', 'release_date', 'tmdb_id', 'services']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['author', 'stars', 'comment']