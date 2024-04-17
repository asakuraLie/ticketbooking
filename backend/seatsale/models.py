from django.db import models

class Seat(models.Model):
    name = models.CharField(max_length=10, null=False, blank=False)
    reserved = models.BooleanField(default=False);
    
    def _str_(self):
        return self.name

# Create your models here.
