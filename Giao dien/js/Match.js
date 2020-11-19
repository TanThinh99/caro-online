function ChooseInfoRoom(type)
{
    var chat = document.getElementById("chatContent");
    var member = document.getElementById("member");
    
        // display: none
    chat.style.display = "none";
    member.style.display = "none";

    if(type == "chat")
    {
        chat.style.display = "block";
    }
    else if(type == "member")
    {
        member.style.display = "block";
    }
}