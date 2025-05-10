from .serializers import TareaSerializer 
from .models import Tarea
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET', 'POST'])
def Tarea_list(request):
    """
    List all code Tareas, or create a new Tarea.
    """
    if request.method == 'GET':
        Tareas = Tarea.objects.all()
        serializer = TareaSerializer(Tareas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TareaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def TareaViewDetail(request, pk):
    """
    Retrieve, update or delete a code Tarea.
    """
    try:
        tarea = Tarea.objects.get(pk=pk)
    except tarea.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TareaSerializer(tarea)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TareaSerializer(tarea, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        tarea.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
