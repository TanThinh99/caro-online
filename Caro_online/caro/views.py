from django.shortcuts import render

# Create your views here.

def GetIndex(request):
    return render(request, "Index.html")