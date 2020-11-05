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
        document.getElementById("setRuleBtn").disabled = true;
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

room_key = document.getElementById("room_key").value;
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
    if(rules.type == 0)
    {
        document.getElementById("withComputer").click();
    }
    else if(rules.type == 1)
    {
        document.getElementById("withPlayer").click();
    }
   
        // time
    document.getElementById("time").value = rules.time_of_a_turn;
});