$(document).ready(function () {
    let signupForm = $(".form-signin")
    let firstName = $("#first-name")
    let lastName = $("#last-name")
    let emailInput = $("#email")
    let passwordInput = $("#input-password")
    let ageInput = $("#age")
    let genderInput = $("#gender")
    let orientation = $("#orientation")
    let avatarImage = $("#avatarImage")
    let avatarInput = $("#avatar")
    let pref1 = $("#pref-1")
    let pref2 = $("#pref-2")
    let pref3 = $("#pref-3")
    let aboutMe1 = $("#about-me-1")
    let aboutMe2 = $("#about-me-2")
    let aboutMe3 = $("#about-me-3")
    let security1 = $("#security-1")
    let security2 = $("#security-2")
   
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
          console.log(file)
          return file
        }
    });
    

    signupForm.on("submit", function (e) {
        // e.preventDefault();
        var userData = {
            first_name: firstName.val().trim(),
            last_name: lastName.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),
            age: ageInput.val().trim(),
            orientation: orientation.val().trim(),
            avatar: avatarInput[0].files[0].name,
            gender: genderInput.val(),
            securityQuestion1: security1.val().trim(),
            securityQuestion2: security2.val().trim(),           
            userPref1: null,
            userPref2: null,
            userPref3: null,
            aboutMe1: null,
            aboutMe2: null,
            aboutMe3: null,
            matches: null,
            location: null
        }

        console.log("Submiting Form")
        createNewUser({userData})

    })


    function createNewUser({userData}) {
        // send the file to the DB
        $.post("/profile",{
            avatar: userData.avatar,
            enctype: "multipart/form-data"
        }).then(function() {
            console.log("attempting to redirect")

        });

        $.post("/api/signup", {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            password: userData.password,
            age: userData.age,
            orientation: userData.orientation,
            avatar: userData.avatar,
            gender: userData.gender,
            securityQuestion1: userData.securityQuestion1,
            securityQuestion2: userData.securityQuestion2,            
            userPref1: userData.userPref1,
            userPref2: userData.userPref2,
            userPref3: userData.userPref3,
            aboutMe1: userData.aboutMe1,
            aboutMe2: userData.aboutMe2,
            aboutMe3: userData.aboutMe3,
            matches: userData.matches,
            location: userData.location

        })
            .then(function() {
                console.log("attempting to redirect")
                window.location.href = "/logout";
            });
    }

});