from django.urls import path

from . import views

urlpatterns = [
    path("", views.GetIndex, name="Get_index"),
]