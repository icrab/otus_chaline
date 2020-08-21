from shop.models import Order, Product
from rest_framework import serializers
from tea.api.serializer import TeaGradeSerializer


class ProductSerializer(serializers.ModelSerializer):
    tea = TeaGradeSerializer()

    class Meta:
        model = Product
        fields = 'tea', 'count'

        extra_kwargs = {
            'cost': {'read_only': True},
        }


class OrderSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=True)

    class Meta:
        model = Order
        fields = 'id', 'user', 'product', 'date', 'total_cost', 'is_active'

        extra_kwargs = {
            'id': {'read_only': True},
            'date': {'read_only': True},
            'total_cost': {'read_only': True},
            'is_active': {'read_only': True},
        }

