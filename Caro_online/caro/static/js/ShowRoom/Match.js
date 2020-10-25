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


//Ready button and Not Ready button
room_key = document.getElementById("room_key").value;
user_key = document.getElementById("user_key").value;

var board_key;
data_room = firebase.database().ref("rooms").child(room_key)
data_room.once("value", function(snapshot) {
    room = snapshot.val();
    board_key = room.board;

        // Check user1 and user are not empty, the match will start
    data_board = firebase.database().ref("boards").child(board_key).child("detail");
    data_board.on("value", function(snapshot) {
        board_detail = snapshot.val();
        if(board_detail.user1 != "" && board_detail.user2 != "")
        {
            document.getElementById("readyBtn").disabled = true;
            document.getElementById("notReadyBtn").disabled = true;

                // Define is player
            user_key = document.getElementById("user_key").value;
            if(user_key == board_detail.user1 || user_key == board_detail.user2)
            {
                document.getElementById("isPlayer").value = "1";
            }

                // Set board table again
            board_type = document.getElementById("board_type").value;
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
                }
            }, 1000);
        }
    });
});


readyBtn = document.getElementById("readyBtn");
notReadyBtn = document.getElementById("notReadyBtn");
readyBtn.onclick = function() {
    readyBtn.disabled = true;
    notReadyBtn.disabled = false;
    // document.getElementById("leaveRoomLink").hidden = true;
    document.getElementById("readyState").value = "1";
        // Check user1, user2
    data_board = firebase.database().ref("boards").child(board_key).child("detail");
    data_board.once("value", function(snapshot) {
        board_detail = snapshot.val();
        user1 = board_detail.user1;
        user2 = board_detail.user2;
        user_key = document.getElementById("user_key").value;
            // Get name of user
        name = userList[user_key];
        if(name == "undefined")
        {
            name = user_key;
        }
        if(user1 == "")
        {
            document.getElementById("player1").innerHTML = "#1 "+ name;

            data = {"user1": user_key};
            firebase.database().ref("boards").child(board_key).child("detail").update(data)
        }
        else if(user2 == "")
        {
            document.getElementById("player2").innerHTML = "#2 "+ name;

            data = {"user2": user_key};
            firebase.database().ref("boards").child(board_key).child("detail").update(data)
        }
    });
}


notReadyBtn.onclick = function() {
    readyBtn.disabled = false;
    notReadyBtn.disabled = true;
    // document.getElementById("leaveRoomLink").hidden = false;
    document.getElementById("readyState").value = "0";
        // user leave this board
    data_board = firebase.database().ref("boards").child(board_key).child("detail");
    data_board.once("value", function(snapshot) {
        board_detail = snapshot.val();
        user1 = board_detail.user1;
        user2 = board_detail.user2;
        user_key = document.getElementById("user_key").value;
        if(user1 == user_key)
        {
            document.getElementById("player1").innerHTML = "#1";

            data = {"user1": ""};
            firebase.database().ref("boards").child(board_key).child("detail").update(data)
        }
        else if(user2 == user_key)
        {
            document.getElementById("player1").innerHTML = "#2";

            data = {"user2": ""};
            firebase.database().ref("boards").child(board_key).child("detail").update(data)
        }
    });
}


// Clock uses to count time
var count;
function CountTime(number)
{
    count = setInterval(function() {
        str = number +" seconds";
        document.getElementById("countTime").innerHTML = str;
        number--;

        if(number == -1)
        {
            clearInterval(count);
            document.getElementById("countTime").innerHTML = "START MATCH";
        }
    }, 1000);
}


// Check ready state when user leave room or close this tab
function CheckReadyState()
{   
    state = document.getElementById("readyState").value;
    if(state == "1")
    {
            // Delete this user in board
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