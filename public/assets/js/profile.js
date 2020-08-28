$(document).ready(function(){
    console.log("js connected")
    let currentProfileID = $("#thisUser").val();
    let avatarImage = $("#avatarImage")
    let avatarInput = $("#avatar")
    let avatar = $("img").attr("src");//Pre existing SRC
    console.log(avatar)
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

    $(avatarImage).click(function (e) { 
        e.preventDefault();
        $(avatarInput).click();
    });

    $(avatarInput).change(function profilePic(e) {
        // console.log(avatarInput[0].files[0].name)
        const preview = document.querySelector('img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        console.log(reader)
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          preview.src = reader.result;
        }, false);
        if (file) {
          reader.readAsDataURL(file);
          console.log(file.name)
          return file
        }
    });
    

    createProfileButton.on("click", function(e) {
        e.preventDefault();
        let locationName = $("#location").val().trim();
        // let locationLat = $("#latitudeInput").val()
        // let locationLong = $("#longitudeInput").val()
        var aboutMe1 = $("#aboutMe1").val();
        var aboutMe2 = $("#aboutMe2").val();
        var aboutMe3 = $("#aboutMe3").val();
        var userPref1 = $("#userPref1").val().trim();
        var userPref2 = $("#userPref2").val().trim();
        var userPref3 = $("#userPref3").val().trim();
        // var createProfileButton = $("#profileUpdate");

        // define user data
        var userData = {
            avatar: avatar,
            location: locationName,
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
        // check the state of the image
            let avatarAsString = userData.avatar
        if (avatarAsString.includes('https://dateapppbucket.s3-us-west-2.amazonaws.com/') === false) {
            // send the file to the s3 DB
            $.post("/profile",{
                avatar: "https://dateapppbucket.s3-us-west-2.amazonaws.com/"+userData.avatar,
                enctype: "multipart/form-data"
            }).then(function() {
                console.log("attempting to redirect")

            });
        }

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