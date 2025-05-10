from django.db import models


class User(models.Model):
    nombre = models.CharField(max_length=100)
    contra = models.CharField()
    