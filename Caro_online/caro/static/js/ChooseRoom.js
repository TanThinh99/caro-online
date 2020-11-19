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
        str += "<div class='room-item' onclick='EnterRoom(\""+ user +"\", \""+ key +"\")'>";
            name = userList[rooms[key].boss_room];
            if(name == "undefined")
            {
                name = rooms[key].boss_room;
            }
            str += "<div>Boss name: "+ name +"</div>";
            str += "<div>Board type: "+ rooms[key].rules.board_type +"x"+ rooms[key].rules.board_type +"</div>";
            var temp;
            if(rooms[key].rules.type == 0)
            {
                temp = "Match with the computer";
            }
            else if(rooms[key].rules.type == 1)
            {
                temp = "Match with the player";
            }
            str += "<div>Type: "+ temp +"</div>";
            str += "<div>Time of a turn: "+ rooms[key].rules.time_of_a_turn +"</div>";
        str += "</div>";
    }
    document.getElementById("rooms").innerHTML = str;
});

function EnterRoom(user, room)
{
    window.location.href = "../EnterRoom/"+ user +"/"+ room;
}