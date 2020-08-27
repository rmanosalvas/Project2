$(document).ready(function () {
    console.log("connected")
    // this user id
    let currentUserId = $("#thisUser").val();
    // other users id
    let otherUserId = $("#othersId").val()
    console.log(currentUserId + " this user")
    console.log(otherUserId + " other user")
    // button to match with user
    let matchButton = $("#match")

    $(matchButton).on("click", function () {
        console.log("Match Button Clicked")
        // create the new match object
        var thisMatch = {
            user1: currentUserId,
            user2: otherUserId
        }// create the new match
        createMatch(thisMatch)

        
    });

    //  creates the connection for two users then takes user to their matches
      function createMatch(newMatch) {
          console.log(newMatch)
        $.ajax({
            type: "POST",
            url: "/api/matches/",
            data: {
                user1: newMatch.user1,
                user2: newMatch.user2,
            },
            success: function (response) {
                // added the match succesfull
                console.log("Match Created!")
                
            }
        })
        .then((result) => {
            console.log(result)
            window.location.href = "/matches/"+currentUserId;
        })
    }

});