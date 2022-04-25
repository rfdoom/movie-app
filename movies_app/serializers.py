from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# used to convert complex data to Python datatypes that can then be rendered into JSON
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['title', 'overview', 'release_date', 'tmdb_id', 'services']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['author', 'stars', 'comment']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # to hash password
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        user.save()
        return user