from django.urls import path
from . import views

urlpatterns = [
    path("tasks/", views.TaskListCreate.as_view(), name="task-list"),
    path("tasks/delete/<int:pk>/", views.TaskDelete.as_view(), name="delete-task"),
    path("profiles/", views.ProfileListCreate.as_view(), name="profile-list"),
    path("profiles/<int:pk>/", views.ProfileRetrieveUpdateDestroy.as_view(), name="profile-detail"),
    path("payments/", views.PaymentProfileListCreate.as_view(), name="payment-list"),
    path("payments/<int:pk>/", views.PaymentProfileRetrieveUpdateDestroy.as_view(), name="payment-detail"),
    path("proxies/", views.ProxyListCreate.as_view(), name="proxy-list"),
    path("proxies/<int:pk>/", views.ProxyRetrieveUpdateDestroy.as_view(), name="proxy-detail"),
    
]