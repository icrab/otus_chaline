from rest_framework.permissions import AllowAny
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework import status
from .serializer import OrderSerializer, ProductSerializer
from shop.models import Order, Product
from tea.models import Tea
from rest_framework.response import Response


class OrderViewSet(CreateModelMixin, ListModelMixin, GenericAPIView):
    permission_classes = (AllowAny, )

    def get(self, request, *args, **kwargs):
        user = request.user
        order = Order.objects.get(user=user, is_active=True)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user = request.user
        tea_id = request.data['tea']
        count = int(request.data['count'])

        order, _ = Order.objects.get_or_create(user=user, is_active=True)
        tea = Tea.objects.get(id=tea_id)
        product_cost = tea.cost * count

        product, _ = Product.objects.get_or_create(order=order, tea=tea)
        serializer = ProductSerializer(product)

        if count != 0:
            product.cost = product_cost
            product.count = count
            product.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            product.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self):
        pass

