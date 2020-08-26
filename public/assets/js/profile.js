$(document).ready(function(){
    // var age = $("#age");
    // var orientation = $("#orientation");
    // var location = $("#location");
    var userAboutMe1 = $("userAboutMe1").val().trim();
    var userAboutMe2 = $("userAboutMe2").val().trim();
    var userAboutMe3 = $("userAboutMe3").val().trim();
    var userPref1 = $("userPref1").val().trim();
    var userPref2 = $("userPref2").val().trim();
    var userPref3 = $("userPref3").val().trim();
    var createProfileButton = $("createProfile");

    createProfileButton.on("submit", function(e) {
        e.preventDefault();
        var userData = {
            userAboutMe1: userAboutMe1,
            userAboutMe2: userAboutMe2,
            userAboutMe3: userAboutMe3,
            userPref1: userPref1,
            userPref2: userPref2,
            userPref3: userPref3
        }

        if (!userData.userAboutMe1 || !userData.userAboutMe2 || !userData.userAboutMe3 || !userData.userPref1 || !userData.userPref2 || !userData.userPref3) {
            return;
        };

        generateProfile(userData.userAboutMe1, userData.userAboutMe2, userData.userAboutMe3, userData.userPref1, userData.userPref2, userData.userPref3)
    });

    function generateProfile(userAboutMe1, userAboutMe2, userAboutMe3, userPref1, userPref2, userPref3) {
        $.post("api", {
            userAboutMe1: userAboutMe1,
            userAboutMe2: userAboutMe2,
            userAboutMe3: userAboutMe3,
            userPref1: userPref1,
            userPref2: userPref2,
            userPref3: userPref3
        }).then(function(data) {
            window.location.href = "/dashboard";
            console.log(data);
        });
    };


});