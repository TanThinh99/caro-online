// ===================== INIT ===================================
    // Get info for room
room_key = document.getElementById("room_key").value;
room = firebase.database().ref("rooms").child(room_key);
room.once("value", function(snapshot) {
    room = snapshot.val();
    
        // Board_type
    board_type = room.rules.board_type;
    document.getElementById("board_type").value = board_type;
    str = "<table border='1'>";
    for(i=0; i<board_type; i++)
    {
        str += "<tr>";
        for(j=0; j<board_type; j++)
        {
            str += "<td></td>";
        }
        str += "</tr>"
    }
    str += "</table>";
    document.getElementById("board").innerHTML = str;

        // type
    type = room.rules.type;
    if(type == 0)
    {
        document.getElementById("withComputer").click();
    }
    else
    {
        document.getElementById("withPlayer").click();
    }
        // time_of_a_turn
    document.getElementById("time").value = room.rules.time_of_a_turn;

        // if user is not boss_room, user can't set rule
    user_key = document.getElementById("user_key").value;
    if(user_key != room.boss_room)
    {
        document.getElementById("board_type").disabled = true;
        document.getElementById("withComputer").disabled = true;
        document.getElementById("withPlayer").disabled = true;
        document.getElementById("time").disabled = true;
        document.getElementById("setRuleBtn").classList.add("disabled");
    }
});


// ================================ SETTING RULE ============================
document.getElementById("setRuleBtn").onclick = function() {
        // board_type
    board_type = document.getElementById("board_type").value;
    if(board_type == "")
    {
        alert("You must choose a board type!!");
        return;
    }
    
        // match_type
    withComputer = document.getElementById("withComputer");
    match_type = 1;
    if(withComputer.checked)
    {
        match_type = 0;
    }

        //check match_type with board_type: computer can't play more than 3x3
    if((match_type == 0) && (board_type*1 >= 4))
    {
        alert("Computer can't play more than 3x3");
        return;
    }

        // time
    time = document.getElementById("time").value;

    room_key = document.getElementById("room_key").value;
    data = {
        "board_type": board_type,
        "type": match_type,
        "time_of_a_turn": time
    }
    firebase.database().ref("rooms").child(room_key).child("rules").update(data);
    alert("Setting rule successful");
}

var room_key = document.getElementById("room_key").value;
var data_boss_room = firebase.database().ref("rooms").child(room_key).child("boss_room");
data_boss_room.once("value", function(snapshot) {
    var boss_room = snapshot.val();

    data_rule_room = firebase.database().ref("rooms").child(room_key).child("rules");
    data_rule_room.on("value", function(snapshot) {
        rules = snapshot.val();
            
            // board_type
        board_type = rules.board_type;
        document.getElementById("board_type").value = board_type;
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
        var username2 = "";
        var player2 = "";
        if(rules.type == 0)
        {
            document.getElementById("withComputer").checked = true;

            user_key = document.getElementById("user_key").value;
            // if(user_key != boss_room)
            // {
            //     document.getElementById("readyBtn").disabled = true;
            // }
            player2 = "#2 Computer";
            username2 = "Computer";
        }
        else if(rules.type == 1)
        {
            document.getElementById("withPlayer").checked = true;
            // document.getElementById("readyBtn").disabled = false;
            player2 = "#2";
            username2 = "";
        }
        document.getElementById("player2").innerHTML = player2;
        data = {
            "user2": username2
        }
        board_key = document.getElementById("board_key").value;
        firebase.database().ref("boards").child(board_key).child("detail").update(data);

            // time
        document.getElementById("time").value = rules.time_of_a_turn;
    });
});
