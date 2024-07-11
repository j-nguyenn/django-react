from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    MODE_CHOICES = [
        ('bypass', 'Bypass'),
        ('atc', 'ATC'),
        ('checkout', 'Checkout'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    
    name = models.CharField(max_length=255)
    ticketmaster_profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    payment_profile = models.ForeignKey('PaymentProfile', on_delete=models.CASCADE)
    mode = models.CharField(max_length=20, choices=MODE_CHOICES)
    runtime = models.IntegerField(default=0)  # Assuming runtime in seconds
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    
    def __str__(self):
        return self.name
    


# Profile model
class Profile(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    special_code = models.CharField(max_length=255, blank=True, null=True)
    number_of_tickets = models.IntegerField()
    priority = models.CharField(max_length=255)
    #user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profiles")

    def __str__(self):
        return self.name

# PaymentProfile model
class PaymentProfile(models.Model):
    name = models.CharField(max_length=255)
    card_holder_name = models.CharField(max_length=255)
    card_number = models.CharField(max_length=16)
    expire = models.DateField()
    cvv = models.CharField(max_length=4)
    #user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="payment_profiles")

    def __str__(self):
        return self.name
    

class Proxy(models.Model):
    status_choices = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive')
    ]

    name = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=status_choices)
    usage = models.CharField(max_length=50)
    ips = models.JSONField()
    #user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="proxies")

    def __str__(self):
        return self.name