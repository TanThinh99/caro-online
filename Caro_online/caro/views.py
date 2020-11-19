from django.shortcuts import render, redirect

import pyrebase
import json
import random
import string
# Create your views here.

file = open("./Caro_online/firebase_config.txt", "r")
firebase_config = json.loads(file.read())
file.close()

firebase = pyrebase.initialize_app(firebase_config)
fire_auth = firebase.auth()
database = firebase.database()

def Index(request):
    try:
        token = request.session["token"]
    except KeyError:
        return render(request, "Index.html")
    
    try:
        account = fire_auth.get_account_info(token)
    except:
        del request.session["token"]
        return render(request, "Index.html")
    
    users = account["users"]
    user = users[0]
    uid = user.get("localId")
    user = database.child("users").child(uid).get().val()
    name = user.get("name")
    return render(request, "Index.html", {"name": name})


def GetUser(token):
    account = fire_auth.get_account_info(token)
    users = account["users"]
    user = users[0]
    uid = user.get("localId")
    return uid


def GetRegister(request):
    try:
        report = request.session["report"]
        data = {"report": report}
        del request.session["report"]
    except KeyError:
        data = {}
    return render(request, "Register.html", data)


def PostRegister(request):
    email = request.POST.get("email")
    password = request.POST.get("pass1")
    try:
        user = fire_auth.create_user_with_email_and_password(email, password)
    except:
        request.session["report"] = "Register is failed"
        return redirect("../Register")
    
    uid = user.get("localId")
    name   = request.POST.get("name")

    data = {
        "name": name,
        "email": email,
        "score": 0
    }
    database.child("users").child(uid).set(data)
    return redirect("../")


def GetLogin(request):
    try:
        report = request.session["report"]
        data = {"report": report}
        del request.session["report"]
    except KeyError:
        data = {}
    return render(request, "Login.html", data)


def PostLogin(request):
    email = request.POST.get("email")
    password = request.POST.get("password")
    try:
        user = fire_auth.sign_in_with_email_and_password(email, password)
    except:
        request.session["report"] = "Login is failed"
        return redirect("../Login")
        
    request.session["token"] = user.get("idToken")
    return redirect("../ChooseRoom")


def Logout(request):
    try:
        token = request.session["token"]
        del request.session["token"]
    except KeyError:
        return redirect("../")
    return redirect("../")


def ChooseRoom(request):
        # Check logging?
    try:
        token = request.session["token"]
        uid = GetUser(token)
    except KeyError:
            # Check created uid_of_free?
        try:
            uid = request.session["uid_of_free"]
        except KeyError:
            letter = string.ascii_lowercase
            uid_of_free = ""
            for i in range(12):
                uid_of_free = uid_of_free +''+ random.choice(letter)
            request.session["uid_of_free"] = uid_of_free
            uid = uid_of_free
    return render(request, "ChooseRoom.html", {"user_uid": uid})


def CreateRoom(request):
    try:
        token = request.session["token"]
        uid = GetUser(token)
    except KeyError:
        uid = request.session["uid_of_free"]
    
        # Create board
    data = {
        "detail": {
            "user1": "",
            "user2": ""
        }        
    }
    board = database.child("boards").push(data)

        # Create room
    data = {
        "boss_room": uid,
        "board": board.get("name"),
        "rules": {
            "board_type": 5,
            "type": 1,
            "time_of_a_turn": 10
        }  
    }
    room = database.child("rooms").push(data)
        # room = {"name": "<key>"}

        # Add user_create's uid into room
    data = {
        "user": uid,
        "room": room.get("name")
    }
    database.child("room_persons").push(data)
    return redirect("../ShowRoom/"+ room.get("name"))


def ShowRoom(request, room_key):
    try:
        token = request.session["token"]
        uid = GetUser(token)
    except KeyError:
        uid = request.session["uid_of_free"]
    room_person = database.child("room_persons").order_by_child("user").equal_to(uid).order_by_child("room").equal_to(room_key).get().val()
    for key in room_person:
        room_person_key = key
    return render(request, "ShowRoom.html", {"room_key": room_key, "user_uid": uid, "room_person_key": room_person_key})


def EnterRoom(request, user_key, room_key):
    data = {
        "user": user_key,
        "room": room_key
    }
    database.child("room_persons").push(data)
    return redirect("../../ShowRoom/"+ room_key)


def LeaveRoom(request, room_person_key):
        # Get room_key
    room_key = database.child("room_persons").child(room_person_key).child("room").get().val()
    board_key = database.child("rooms").child(room_key).child("board").get().val()
        # Delete room_person at room_person_key
    database.child("room_persons").child(room_person_key).remove()

        # If room doesn't have user, we will delete it
    try:
        persons = database.child("room_persons").order_by_child("room").equal_to(room_key).get().val()
    except:
        database.child("rooms").child(room_key).remove()

            # Delete new board of this room
        database.child("boards").child(board_key).remove()
    return redirect("../ChooseRoom")


# Temp function
def Temp(request):
    print(request.session["uid_of_free"])