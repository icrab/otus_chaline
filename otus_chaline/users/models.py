from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import MinLengthValidator


class User(AbstractUser):
    username = models.CharField(
        max_length=150,
        unique=True,
        validators=(
            UnicodeUsernameValidator,
            MinLengthValidator(4)
        )
    )

    password = models.CharField(
        max_length=128,
        validators=(MinLengthValidator(4), )
    )

    email = models.EmailField(unique=True)

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username
