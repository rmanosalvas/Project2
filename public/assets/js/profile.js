$(document).ready(function(){
    console.log("js connected")
    let currentProfileID = $("#thisUser").val();
    // let avatarImage = $("#avatar").val();
    // let avatarInput = $("#avatarImage").val();
    // let locationName = $("#location").val();
    // let locationLat = $("#latitudeInput").val()
    // let locationLong = $("#longitudeInput").val()
    // var userAboutMe1 = $("#userAboutMe1").val();
    // var aboutMe2 = $("#aboutMe2").val();
    // var aboutMe3 = $("#aboutMe3").val();
    // var userPref1 = $("#userPref1").val().trim();
    // var userPref2 = $("#userPref2").val().trim();
    // var userPref3 = $("#userPref3").val().trim();
    var createProfileButton = $("#profileUpdate");

    createProfileButton.on("click", function(e) {
        e.preventDefault();
        let avatarImage = $("#avatarImage");
        let avatarInput = $("#avatar")
        let locationName = $("#location").val();
        let locationLat = $("#latitudeInput").val()
        let locationLong = $("#longitudeInput").val()
        var aboutMe1 = $("#aboutMe1").val();
        var aboutMe2 = $("#aboutMe2").val();
        var aboutMe3 = $("#aboutMe3").val();
        var userPref1 = $("#userPref1").val().trim();
        var userPref2 = $("#userPref2").val().trim();
        var userPref3 = $("#userPref3").val().trim();
        // var createProfileButton = $("#profileUpdate");
        // define location
        var location = JSON.stringify(    
        {
            name: locationName,
            lat: locationLat,
            long: locationLong
        });

        // define user data
        var userData = {
            avatar: "image.jpg",
            location: location,
            aboutMe1: aboutMe1,
            aboutMe2: aboutMe2,
            aboutMe3: aboutMe3,
            userPref1: userPref1,
            userPref2: userPref2,
            userPref3: userPref3
        }

        console.log(userData)
        if (!userData.aboutMe1 || !userData.aboutMe2 || !userData.aboutMe3 || !userData.userPref1 || !userData.userPref2 || !userData.userPref3) {
            return;
        };

        generateProfile(userData)
    });
    
    function generateProfile(userData) {
        $.ajax({
            type: "PUT",
            url: "/api/profile/"+currentProfileID,
            data: userData,

        }).then(function(response) {
            window.location.href = "/profile/"+currentProfileID;
            // window.location.reload()
        });
    };



    
});