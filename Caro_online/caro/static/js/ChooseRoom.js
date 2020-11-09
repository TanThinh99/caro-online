userList = []
data_users = firebase.database().ref("users");
data_users.once("value", function(snapshot) {
    users = snapshot.val();
    for(key in users)
    {
        userList[key] = users[key].name;
    }
});

user = document.getElementById("user").value;
data_rooms = firebase.database().ref("rooms");
data_rooms.on("value", function(snapshot) {
    rooms = snapshot.val();
    str = "";
    for(key in rooms)
    {
        str += "<div style='border: 1px dashed red; margin: 7px; padding: 7px;' onclick='EnterRoom(\""+ user +"\", \""+ key +"\")'>";
            name = userList[rooms[key].boss_room];
            if(name == "undefined")
            {
                name = rooms[key].boss_room;
            }
            str += "Boss name: "+ name +"<br>";
            str += "Board type: "+ rooms[key].board_type +"x"+ rooms[key].board_type +"<br>";
            var temp;
            if(rooms[key].type == 0)
            {
                temp = "Match with the computer";
            }
            else if(rooms[key].type == 1)
            {
                temp = "Match with the player";
            }
            str += "Type: "+ temp +"<br>";
            str += "Time of a turn: "+ rooms[key].time_of_a_turn;
        str += "</div>";
    }
    document.getElementById("containRooms").innerHTML = str;
});

function EnterRoom(user, room)
{
    window.location.href = "../EnterRoom/"+ user +"/"+ room;
}