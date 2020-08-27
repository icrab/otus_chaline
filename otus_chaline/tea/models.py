from django.db import models


class Grade(models.Model):
    TYPE_RED = 0
    TYPE_PUER = 1
    TYPE_OOLOONG = 2

    TYPE = (
        (TYPE_RED, 'Красный'),
        (TYPE_PUER, 'Пуэр'),
        (TYPE_OOLOONG, 'Улун')
    )

    type = models.PositiveSmallIntegerField(unique=True, choices=TYPE)

    def __str__(self):
        return self.get_type_display()


class Tea(models.Model):
    TYPE_LOOSE = 0
    TYPE_PRESSED = 1

    TYPE = (
        (TYPE_LOOSE, 'Рассыпной'),
        (TYPE_PRESSED, 'Пресованный')
    )

    name = models.CharField(max_length=75, unique=True)
    cost = models.DecimalField(max_digits=10, default=500, decimal_places=0)
    region = models.CharField(max_length=150, blank=True)
    storage_type = models.PositiveSmallIntegerField(choices=TYPE, default=TYPE_LOOSE)
    img = models.ImageField(upload_to='imgs')
    stock = models.BigIntegerField(default=1000)
    year = models.BigIntegerField(default=2020)
    available = models.BooleanField(default=True)
    grade = models.ForeignKey(Grade, related_name='tea', default=1, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

    @property
    def shorted_name(self):
        if len(self.name) > 15:
            return f'{self.name[:15]}'
        return f'{self.name}'
