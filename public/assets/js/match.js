$(document).ready(function () {
// button to match with user
    let matchButton = $("#match")
    let modalButton =$("#modalToggleBtn")
    console.log("connected")
    // this user id
    let currentUserId = $("#thisUser").val();
    // other users id
    let otherUserId = $("#othersId").val()
    console.log(currentUserId + " this user")
    console.log(otherUserId + " other user")
    if ((currentUserId == otherUserId)) {
    // Hide the modal and match buttons if user viewing their own profile
    $(modalButton).remove();
    $(matchButton).remove();

    } else {
        $(matchButton).on("click", function () {
            console.log("Match Button Clicked")
            // create the new match object
            var thisMatch = {
                user1: currentUserId,
                user2: otherUserId
            }// create the new match
            createMatch(thisMatch)

        });
    }

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
                console.log(response)
                // added the match succesfull
                console.log("Match Created!")
            }
        })
        .then((result) => {
            console.log(result)
            window.location.href = "/matches";
        })
    }


$.ajax({
    type: "get",
    url: "/user/"+otherUserId,
    data: "data",
    dataType: "dataType",
    success: function (response) {
        console.log(response)
    }
});


});