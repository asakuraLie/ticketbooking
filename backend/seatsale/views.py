from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Seat
from .serializer import SeatSerializer

class SeatView(ModelViewSet):
    
    serializer_class = SeatSerializer
    queryset = Seat.objects.all()
    
    def create(self, request):
        serializer = SeatSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        queryset = Seat.objects.create(**serializer.validated_data)
        serializer = SeatSerializer(queryset)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def retrieve(self, request, pk):
        queryset = Seat.objects.filter(pk=pk).first()

        if not queryset:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = SeatSerializer(queryset)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def list_all(self, request):
        queryset = Seat.objects.all()

        if not queryset:
            return Response(status=status.HTTP_204_NO_CONTENT)

        serializer = SeatSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def reserve(self, request, pk):
       
        seat = Seat.objects.filter(pk=pk).first()
        seat.reserved = True
        seat.save()
        response_serializer = SeatSerializer(seat)
        
        return Response(response_serializer.data, status=status.HTTP_200_OK)
    
    def make_available(self, request, pk):
       
        seat = Seat.objects.filter(pk=pk).first()
        seat.reserved = False
        seat.save()
        response_serializer = SeatSerializer(seat)
        
        return Response(response_serializer.data, status=status.HTTP_200_OK)
    
# Create your views here.
