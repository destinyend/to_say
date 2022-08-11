from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import *


class FilterMixin:
    @action(methods=['GET'], detail=False)
    def filter(self, request):
        kwargs = request.query_params.dict()
        for key, val in kwargs.items():
            if key.endswith('range') or key.endswith('in'):
                kwargs[key] = val.split(',')
            if val == 'null':
                kwargs[key] = None
        try:
            return Response(
                self.serializer_class(
                    self.queryset.filter(**kwargs),
                    many=True
                ).data,
                status=status.HTTP_200_OK
            )
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST, data=str(e))


class ModelFilterViewSet(ModelViewSet, FilterMixin):
    pass
