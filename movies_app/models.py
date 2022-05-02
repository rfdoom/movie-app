from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import (AbstractUser)
from django.core.validators import *
from django.utils import timezone

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    tmdb_id = models.IntegerField(blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    services = []

    def __str__(self):
        return self.title

    def show_all(self):
        return [self.title, self.overview, self.release_date, self.image, self.services]

    

class Review(models.Model):
    author = models.CharField(max_length=40, default='anonymous')
    review_date = models.DateTimeField(default=timezone.now)
    rate_choices = (
        (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5)
    )
    stars = models.IntegerField(choices=rate_choices)
    comment = models.TextField(max_length=4000)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')

    def __str__(self):
        return self.movie.title