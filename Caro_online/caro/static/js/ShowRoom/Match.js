userList = []
users = firebase.database().ref("users");
users.once("value", function(snapshot) {
    users = snapshot.val();
    for(key in users)
    {
        userList[key] = users[key].name;
    }
});

function GetUserName(user_key)
{
    name = userList[user_key];
    if(name == "undefined")
    {
        name = user_key;
    }
    return name;
}

    // Cập nhật tên của những người đang ở trong phòng
room_key = document.getElementById("room_key").value;
data_room_person = firebase.database().ref("room_persons").orderByChild("room").equalTo(room_key);
data_room_person.on("value", function(snapshot) {
    data = snapshot.val();
    str = "";
    for (key in data)
    {
        user_key = data[key].user;
        name = GetUserName(user_key);
        str += "<p>"+ name +"</p>";
    }
    document.getElementById("containPersons").innerHTML = str;
});


    // Update board_key when create new board
var data_board_of_room = firebase.database().ref("rooms").child(room_key).child("board");
data_board_of_room.on("value", function(snapshot) {
    board_key = snapshot.val();
    document.getElementById("board_key").value = board_key;
    
    // Reset temp value
    document.getElementById("setRuleBtn").disabled = false;
    var withComputer = document.getElementById("withComputer");
    if(withComputer.checked && withComputer.disabled)
    {
        document.getElementById("readyBtn").disabled = true;    
    }
    else
    {
        document.getElementById("readyBtn").disabled = false;
    }
    document.getElementById("notReadyBtn").disabled = true;
    document.getElementById("countTime").innerHTML = "";
    document.getElementById("matchTurn").value = "1";
    document.getElementById("matchStarted").value = "0";
    document.getElementById("isPlayer").value = "0";
    document.getElementById("user1").value = "";
    document.getElementById("user2").value = "";

    ControlBoard(board_key);
});

function ControlBoard(board_key)
{
        // Run when detail in board changed
    var data_board = firebase.database().ref("boards").child(board_key).child("detail");
    data_board.on("value", function(snapshot) {
        var board_detail = snapshot.val();

            // Update name in id="player(1/2)" when user click "ready"
        if(board_detail.user1 != "")
        {
            document.getElementById("player1").innerHTML = "#1 "+ GetUserName(board_detail.user1);
        }
        else    // board_detail.user1 == ""
        {
            document.getElementById("player1").innerHTML = "#1";
        }

        if(board_detail.user2 != "")
        {
            document.getElementById("player2").innerHTML = "#2 "+ GetUserName(board_detail.user2);
        }
        else    // board_detail.user2 == ""
        {
            document.getElementById("player2").innerHTML = "#2";
        }

            // Check user1 and user2 are not empty, the match will start
        var matchStarted = document.getElementById("matchStarted").value;
        if((board_detail.user1 != "") && (board_detail.user2 != "") && (matchStarted == "0"))
        {
            document.getElementById("matchStarted").value = "1";
            document.getElementById("readyBtn").disabled = true;
            document.getElementById("notReadyBtn").disabled = true;

            document.getElementById("user1").value = board_detail.user1;
            document.getElementById("user2").value = board_detail.user2;

                // disabled button setting rule of boss_room
            document.getElementById("setRuleBtn").disabled = true;

            // Define is player
            user_key = document.getElementById("user_key").value;
            if(user_key == board_detail.user1 || user_key == board_detail.user2)
            {
                document.getElementById("isPlayer").value = "1";
            }

            // Set board table again
            isPlayer = document.getElementById("isPlayer").value;
                // user is player, and user is #1 player
            if(isPlayer == "1")
            {       // user1 plays first turn
                if(board_detail.user1 == user_key)
                {
                    str = "<table border='1' class='turning' id='positionsTable'>";
                }
                else    // board_detail.user2 == user_key
                {
                    str = "<table border='1' class='' id='positionsTable'>";
                }                    
            }                
            else    // user is not player, or user is #2 player
            {
                str = "<table border='1'>";    
            }

                // Create new table for board
            board_type = document.getElementById("board_type").value;
            for(i=1; i<=board_type; i++)
            {
                str += "<tr>";
                for(j=1; j<=board_type; j++)
                {
                    if(isPlayer == "1")
                    {
                        str += "<td id='pos"+ i +"_"+ j +"' onclick='ChoosePosition("+ i +", "+ j +")'>&nbsp;</td>";
                    }
                    else if(isPlayer == "0")
                    {
                        str += "<td id='pos"+ i +"_"+ j +"'></td>";
                    }
                }
                str += "</tr>";
            }
            str += "</table>";
            document.getElementById("board").innerHTML = str;

            // Create matrix for board
            rows = [];
            for(i=1; i<=board_type; i++)
            {
                cols = [];
                for(j=1; j<=board_type; j++)
                {
                    cols[j] = -1;
                }
                rows[i] = cols;
            }

            // Count time before match starts
            number = 5;
            count = setInterval(function() {
                str = "Match will start after "+ number +" seconds";
                document.getElementById("countTime").innerHTML = str;
                number--;
        
                if(number == -1)
                {
                    clearInterval(count);
                    document.getElementById("countTime").innerHTML = "START MATCH";

                        // Run timer
                    time = document.getElementById("time").value *1;
                    RunTimer(time);
                }
            }, 1000);

                // Run whenever user choose position or out of time
            var boss_room = room.boss_room;
            var data_position_board = firebase.database().ref("boards").child(board_key).child("positions");
            data_position_board.on("child_added", function(snapshot) {
                var position = snapshot.val();
                var x = position.position_x;
                var y = position.position_y;
                var notYetWin = true;
                    // stop timer
                clearInterval(count);

                    // check x, x == 0, turns ago is out of time, we no work
                var amount_to_win;
                if(x != 0)
                {
                        // Set background-image (x or y) for position, and set value for matrix
                    var cols = rows[x];
                    if(position.flag_type == "x")
                    {
                        document.getElementById("pos"+ x +"_"+ y).classList.add("x");
                        cols[y] = 1;
                        document.getElementById("matchTurn").value = "2";
                    }
                    else
                    {
                        document.getElementById("pos"+ x +"_"+ y).classList.add("o");
                        cols[y] = 0;
                        document.getElementById("matchTurn").value = "1";
                    }
                    rows[x] = cols;

                        // Check WIN
                    var board_type = document.getElementById("board_type").value *1;
                    if(board_type <= 5)
                    {
                        amount_to_win = board_type;
                    }
                    else
                    {
                        amount_to_win = 5;
                    }
                    var positionList = CheckWin(rows, x, y, amount_to_win);
                        // length == 0 is NOT RESULT, == 1 is TIE, > 1 is WIN
                    if(positionList.length != 0)
                    {
                            // WIN
                        notYetWin = false;
                        if(positionList.length > 1)
                        {
                            var i;
                            for(i=0; i<positionList.length; i++)
                            {
                                x = positionList[i][0];
                                y = positionList[i][1];
                                document.getElementById("pos"+ x +"_"+ y).style.backgroundColor = "yellow";
                            }
                        }
                        var user_key = document.getElementById("user_key").value;
                        if(user_key == boss_room)
                        {
                            var time = document.getElementById("time").value *1;
                            var withComputer = document.getElementById("withComputer");
                            var type, winner = "";
                            if(withComputer.checked)
                            {
                                type = 0;
                            }
                            else
                            {
                                type = 1;
                            }
                            if(positionList.length > 1)
                            {
                                if(position.flag_type == "x")
                                {
                                    winner = document.getElementById("user1").value;
                                }
                                else
                                {
                                    winner = document.getElementById("user2").value;
                                }
                            }                            
                            d = new Date();
                            var time_done = d.getFullYear() +"-"+ (d.getMonth()*1+1) +"-"+ d.getDate() +" "+ d.getHours() +":"+ d.getMinutes() +":"+ d.getSeconds();
                            data = {
                                "winner": winner,
                                "board_type": board_type,
                                "type": type,
                                "time_of_a_turn": time,
                                "time_done": time_done
                            }
                            firebase.database().ref("boards").child(board_key).child("detail").update(data);
                        
                            // Check match with computer
                            var user2 = ""
                            withComputer = document.getElementById("withComputer");
                            if(withComputer.checked)
                            {
                                user2 = "Computer";
                            }

                                // Create new board
                            data = {
                                "detail": {
                                    "user1": "",
                                    "user2": user2
                                }
                            };
                            board = firebase.database().ref("boards").push(data);
                            board_key = board.path.o["1"];
                            data = {
                                "board": board_key
                            }
                            firebase.database().ref("rooms").child(room_key).update(data);
                        }                          
                    }
                }

                if( notYetWin )
                {
                        // Set matchTurn
                    if(position.flag_type == "x")
                    {
                        document.getElementById("matchTurn").value = "2";
                    }
                    else
                    {
                        document.getElementById("matchTurn").value = "1";
                    }

                        // Add class="turning" for user
                    var user1 = document.getElementById("user1").value;
                    var user2 = document.getElementById("user2").value;
                    var user_key = document.getElementById("user_key").value;
                    var matchTurn = document.getElementById("matchTurn").value;
                    if((matchTurn == "1" && user1 == user_key) || (matchTurn == "2" && user2 == user_key) || (matchTurn == "2" && user2 == "Computer"))
                    {
                        document.getElementById("positionsTable").classList.add("turning");
                    }

                        // Run timer
                    var time = document.getElementById("time").value *1;
                    RunTimer(time);

                        // Computer choose a position
                    var user_key = document.getElementById("user_key").value;
                    var matchTurn = document.getElementById("matchTurn").value;
                    if((user2 == "Computer") && (matchTurn == "2")) //(user_key == boss_room) && 
                    {
                        var str = RunCutBranchAB(amount_to_win);
                        var temp = str.indexOf("_");
                        var x = str.substring(0, temp) *1;
                        var y = str.substring(temp + 1) *1;
                        ChoosePosition(x, y);
                    }
                }        
            }); 
        }
    });
}


function RunCutBranchAB(amount_to_win)
{
        // Run empty positionin rows
    var i, j, position, vp = -999;
    for(i=1; i <= rows.length - 1; i++)
    {
        for(j=1; j <= rows[1].length - 1; j++)
        {
            if(rows[i][j] == -1)
            {
                // Máy là cờ O, Người là cờ X     
                // MAX là O đi, MIN là X đi
                var str = CutBranchAB(rows, "MIN", vp, amount_to_win, i, j);
                console.log(str);
                var vq = Get_Vq(str);
                if(vq > vp)
                {
                    vp = vq;
                    var temp = str.indexOf("_");
                    position = str.substring(temp + 1);
                }
            }
        }
    }                        
    return position;
}


// Clock uses to run timer
var count;
function RunTimer(number)
{    
    count = setInterval(function() {
        str = number +" seconds";
        document.getElementById("countTime").innerHTML = str;
        number--;

        if(number == -1)
        {
            clearInterval(count);
            document.getElementById("countTime").innerHTML = "OUT OF TIME";
                // User do not choose a position but was out of time
            ChoosePosition(0, 0);
        }
    }, 1000);
}


//Ready button and Not Ready button
readyBtn = document.getElementById("readyBtn");
notReadyBtn = document.getElementById("notReadyBtn");
readyBtn.onclick = function() {
    readyBtn.disabled = true;
    notReadyBtn.disabled = false;
    document.getElementById("readyState").value = "1";
        
        // Check user1, user2
    board_key = document.getElementById("board_key").value;
    data_board = firebase.database().ref("boards").child(board_key).child("detail");
    data_board.once("value", function(snapshot) {
        board_detail = snapshot.val();
        user1 = board_detail.user1;
        user2 = board_detail.user2;
        user_key = document.getElementById("user_key").value;
        if(user1 == "")
        {
            data = {"user1": user_key};
            firebase.database().ref("boards").child(board_key).child("detail").update(data)
        }
        else if(user2 == "")
        {
            data = {"user2": user_key};
            firebase.database().ref("boards").child(board_key).child("detail").update(data)
        }
    });
}


notReadyBtn.onclick = function() {
    readyBtn.disabled = false;
    notReadyBtn.disabled = true;
    document.getElementById("readyState").value = "0";
    
        // user leave this board
    board_key = document.getElementById("board_key").value;
    data_board = firebase.database().ref("boards").child(board_key).child("detail");
    data_board.once("value", function(snapshot) {
        board_detail = snapshot.val();
        user1 = board_detail.user1;
        user2 = board_detail.user2;
        user_key = document.getElementById("user_key").value;
        if(user1 == user_key)
        {
            data = {"user1": ""};
            firebase.database().ref("boards").child(board_key).child("detail").update(data)
        }
        else if(user2 == user_key)
        {
            data = {"user2": ""};
            firebase.database().ref("boards").child(board_key).child("detail").update(data)
        }
    });
}


// Check ready state when user leave room or close this tab
function CheckReadyState()
{   
    state = document.getElementById("readyState").value;
    if(state == "1")
    {
            // Delete this user in board
        board_key = document.getElementById("board_key").value;
        data_board = firebase.database().ref("boards").child(board_key).child("detail");
        data_board.once("value", function(snapshot) {
            board_detail = snapshot.val();
            user1 = board_detail.user1;
            user2 = board_detail.user2;
            user_key = document.getElementById("user_key").value;
            if(user1 == user_key)
            {
                data = {"user1": ""};
                firebase.database().ref("boards").child(board_key).child("detail").update(data)
            }
            else if(user2 == user_key)
            {
                data = {"user2": ""};
                firebase.database().ref("boards").child(board_key).child("detail").update(data)
            }
        });
    }
}


// Players choose position when match started
function ChoosePosition(x, y)
{
    var matchTurn = document.getElementById("matchTurn").value;
    var user_key = document.getElementById("user_key").value;
    var user1 = document.getElementById("user1").value;
    var user2 = document.getElementById("user2").value;
    if((matchTurn == "1" && user1 == user_key) || (matchTurn == "2" && user2 == user_key) || (matchTurn == "2" && user2 == "Computer"))
    {
            // Check (that position is empty?) or (x=0, y=0 => This is out of time)
        var pass = true;
        if(x != 0)
        {
            var cols = rows[x];
            if(cols[y] != -1)
            {
                pass = false;
            }
        }
        if( pass )
        {
                // Update matchTurn, Main purpose: avoid player clicks two times
            if(matchTurn == "1")
            {
                document.getElementById("matchTurn").value = "2";
            }
            else if(matchTurn == "2")
            {
                document.getElementById("matchTurn").value = "1";
            }

                // Delete class="turning" in table, turning used when user hover on <td>
            document.getElementById("positionsTable").classList.remove("turning");

                // Save position
            var flag_type;            
            if(matchTurn == "1")
            {
                flag_type = "x";
            }
            else if(matchTurn == "2")
            {
                flag_type = "o";
            }
            data = {
                "flag_type": flag_type,
                "position_x": x,
                "position_y": y
            }
            board_key = document.getElementById("board_key").value;
            firebase.database().ref("boards").child(board_key).child("positions").push(data)
        }        
    }    
}
