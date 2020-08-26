from django.db import models
from tea.models import Tea
from users.models import User
import uuid


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    total_cost = models.BigIntegerField(default=0)

    @property
    def get_total_cost(self):
        total_cost = 0
        for product in self.products.all():
            total_cost += product.cost
        return total_cost


class Product(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='products')
    tea = models.ForeignKey(Tea, on_delete=models.CASCADE, related_name='products')
    count = models.IntegerField(default=0)
    cost = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.tea_id} - {self.count}'

    @property
    def get_cost(self):
        cost = self.tea.cost * self.count
        return cost
