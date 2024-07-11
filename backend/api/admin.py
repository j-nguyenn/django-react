from django.contrib import admin

# Register your models here.
from .models import Task, Profile, PaymentProfile, Proxy

admin.site.register(Task)
admin.site.register(Profile)
admin.site.register(PaymentProfile)
admin.site.register(Proxy)