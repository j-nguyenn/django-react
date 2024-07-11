from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, TaskSerializer, PaymentProfileSerializer, ProfileSerializer, ProxySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Task, PaymentProfile, Profile, Proxy


class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Profiles
class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


class ProfileRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]


# Payment Profiles
class PaymentProfileListCreate(generics.ListCreateAPIView):
    queryset = PaymentProfile.objects.all()
    serializer_class = PaymentProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


class PaymentProfileRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = PaymentProfile.objects.all()
    serializer_class = PaymentProfileSerializer
    permission_classes = [IsAuthenticated]


# Proxies
class ProxyListCreate(generics.ListCreateAPIView):
    queryset = Proxy.objects.all()
    serializer_class = ProxySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


class ProxyRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proxy.objects.all()
    serializer_class = ProxySerializer
    permission_classes = [IsAuthenticated]