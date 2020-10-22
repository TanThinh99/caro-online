    // Get info for room
room_key = document.getElementById("room_key").value;
room = firebase.database().ref("rooms").child(room_key);
room.once("value", function(snapshot) {
    room = snapshot.val();

        // Board_type
    board_type = room.board_type;
    document.getElementById("type").value = board_type;
    str = "<table border='1'>";
    for(i=0; i<board_type; i++)
    {
        str += "<tr>";
        for(j=0; j<board_type; j++)
        {
            str += "<td>&nbsp;</td>";
        }
        str += "</tr>"
    }
    str += "</table>";
    document.getElementById("board").innerHTML = str;

        // type
    type = room.type;
    if(type == 0)
    {
        document.getElementById("withComputer").click();
    }
    else
    {
        document.getElementById("withPlayer").click();
    }

        // time_of_a_turn
    document.getElementById("time").value = room.time_of_a_turn
});

userList = []
users = firebase.database().ref("users");
users.once("value", function(snapshot) {
    users = snapshot.val();
    for(key in users)
    {
        userList[key] = users[key].name;
    }
});

    // Cập nhật tên của những người đang ở trong phòng
room_key = document.getElementById("room_key").value;
data_room_person = firebase.database().ref("room_persons").orderByChild("room").equalTo(room_key);
data_room_person.on("value", function(snapshot) {
    data = snapshot.val();
    str = "";
    for (key in data)
    {
        user_key = data[key].user;
        name = userList[user_key];
        if(name == "undefined")
        {
            name = user_key;
        }   
        str += "<p>"+ name +"</p>";
    }
    document.getElementById("containPersons").innerHTML = str;
});

    // Kiểm tra mỗi khi nhấn vào checkbox notTime
notTimeCheckbox = document.getElementById("notTime");
function ChooseNotTime() 
{
    if(notTimeCheckbox.checked == true)
    {
        document.getElementById("time").disabled = true;
    }
    else
    {
        document.getElementById("time").disabled = false;
    }
}