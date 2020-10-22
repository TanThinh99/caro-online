from django.urls import path

from . import views

urlpatterns = [
    path("", views.Index, name="Index"),

    path("Register", views.GetRegister, name="Get_register"),
    path("PostRegister", views.PostRegister, name="Post_register"),

    path("Login", views.GetLogin, name="Get_login"),
    path("PostLogin", views.PostLogin, name="Post_login"),
    path("Logout", views.Logout, name="Logout"),

    path("ChooseRoom", views.ChooseRoom, name="Choose_room"),

    path("CreateRoom", views.CreateRoom, name="Create_room"),
    path("ShowRoom/<room_key>", views.ShowRoom, name="Show_room"),

    path("EnterRoom/<user_key>/<room_key>", views.EnterRoom, name="Enter_room"),
    path("LeaveRoom/<room_person_key>", views.LeaveRoom, name="Leave_room"),


    path("temp", views.Temp),
]