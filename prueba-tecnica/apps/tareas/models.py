from django.db import models

class Tarea(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_limite = models.DateTimeField()
    prioridad = models.CharField(max_length=10)
    
    def __str__(self):
        return str(self.titulo)
    


