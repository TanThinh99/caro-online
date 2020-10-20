from django.urls import path

from . import views

urlpatterns = [
    path("", views.GetIndex, name="Get_index"),

    path("Register", views.GetRegister, name="Get_register"),
    path("PostRegister", views.PostRegister, name="Post_register"),

    path("Login", views.GetLogin, name="Get_login"),
    path("PostLogin", views.PostLogin, name="Post_login"),
    path("Logout", views.Logout, name="Logout"),
]