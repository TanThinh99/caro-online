// ===================== INIT ===================================
    // Get info for room
room_key = document.getElementById("room_key").value;
room = firebase.database().ref("rooms").child(room_key);
room.once("value", function(snapshot) {
    room = snapshot.val();
    
        // Board_type
    board_type = room.rules.board_type;
    document.getElementById("board_type").value = board_type;
    str = "<table>";
    for(i=0; i<=board_type; i++)
    {
        str += "<tr>";
        for(j=0; j<=board_type; j++)
        {
            if((i == 0) || (j == 0))
            {
                var content = '';
                if((i == 0) && (j > 0))
                {
                    content = j;
                }
                else if((j == 0) && (i > 0))
                {   
                        // 65 is A (ASCII code)
                    content = String.fromCharCode(65 + i - 1);  
                }
                str += "<td class='order'>"+ content +"</td>";
            }
            else
            {
                str += "<td></td>";
            }            
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
        alert("Computer only can play 3x3");
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
data_rule_room = firebase.database().ref("rooms").child(room_key).child("rules");
data_rule_room.on("value", function(snapshot) {
    rules = snapshot.val();
        
        // board_type
    board_type = rules.board_type;
    document.getElementById("board_type").value = board_type;
    str = "<table>";
    for(i=0; i<=board_type; i++)
    {
        str += "<tr>";
        for(j=0; j<=board_type; j++)
        {
            if((i == 0) || (j == 0))
            {
                var content = '';
                if((i == 0) && (j > 0))
                {
                    content = j;
                }
                else if((j == 0) && (i > 0))
                {   
                        // 65 is A (ASCII code)
                    content = String.fromCharCode(65 + i - 1);  
                }
                str += "<td class='order'>"+ content +"</td>";
            }
            else
            {
                str += "<td></td>";
            }            
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
        player2 = "Computer";
        username2 = "Computer";
    }
    else if(rules.type == 1)
    {
        document.getElementById("withPlayer").checked = true;
        player2 = "";
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
