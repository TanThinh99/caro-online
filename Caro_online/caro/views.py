from django.shortcuts import render, redirect

import pyrebase
import json
# Create your views here.

file = open("./Caro_online/firebase_config.txt", "r")
firebase_config = json.loads(file.read())
file.close()

firebase = pyrebase.initialize_app(firebase_config)
fire_auth = firebase.auth()
database = firebase.database()

def GetIndex(request):
    try:
        token = request.session["token"]
    except KeyError:
        return render(request, "Index.html")
    
    uid = GetUser(token)
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
    nation = request.POST.get("nation")
    score = 0
    flag_type = "x"

    data = {
        "name": name,
        "email": email,
        "nation": nation,
        "score": score,
        "flag_type": flag_type
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
    return redirect("../")


def Logout(request):
    try:
        token = request.session["token"]
        del request.session["token"]
    except KeyError:
        return redirect("../")
    return redirect("../")
