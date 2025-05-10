from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from apps.tareas import views

urlpatterns = [
    path('tareas/', views.Tarea_list),
    path('tarea/<int:pk>/', views.TareaViewDetail),
]

urlpatterns = format_suffix_patterns(urlpatterns)