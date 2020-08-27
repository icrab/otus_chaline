from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView
from rest_framework import status
from .serializer import OrderSerializer, ProductSerializer
from shop.models import Order, Product
from tea.models import Tea
from rest_framework.response import Response


class OrderViewSet(GenericAPIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        order, _ = Order.objects.\
            prefetch_related('products', 'products__tea', 'products__tea__grade').\
            get_or_create(user=user, is_active=True)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        tea_id = request.data['tea']
        count = int(request.data['count'])

        order, _ = Order.objects.\
            get_or_create(user=user, is_active=True)

        tea = Tea.objects.get(id=tea_id)

        product, _ = Product.objects.\
            get_or_create(order=order, tea=tea)

        serializer = ProductSerializer(product)

        if count != 0:
            product.count = count
            product.cost = product.get_cost
            product.save()
            order.total_cost = order.get_total_cost
            order.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            product.delete()
            order.total_cost = order.get_total_cost
            order.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self):
        pass


class OrderHistoryViewSet(GenericAPIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        orders = Order.objects. \
            prefetch_related('products', 'products__tea', 'products__tea__grade').\
            filter(user=user, is_active=False).order_by('-date')

        serializer = OrderSerializer(orders, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderBuyViewSet(GenericAPIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        user = request.user
        try:
            order = Order.objects.\
                get(user=user, is_active=True)

            order.is_active = False
            order.total_cost = order.get_total_cost
            order.save()

            order, _ = Order.objects.\
                get_or_create(user=user, is_active=True)

        except Exception as err:
            print(err)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        response = {'order_id': order.id}

        return Response(response, status=status.HTTP_200_OK)
