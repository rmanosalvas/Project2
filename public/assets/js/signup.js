$(document).ready(function () {
    let signupForm = $(".form-signin")
    let firstName = $("#first-name")
    let lastName = $("#last-name")
    let emailInput = $("#email")
    let passwordInput = $("#input-password")
    let ageInput = $("#age")
    let pref1 = $("#pref-1")
    let pref2 = $("#pref-2")
    let pref3 = $("#pref-3")
    let aboutMe1 = $("#about-me-1")
    let aboutMe2 = $("#about-me-2")
    let aboutMe3 = $("#about-me-3")
    let security1 = $("#security-1")
    let security2 = $("#security-2")

    signupForm.on("submit", function (e) {
        e.preventDefault();
        var userData = {
            first_name: firstName.val().trim(),
            last_name: lastName.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),
            age: ageInput.val().trim(),
            userPref1: pref1.val().trim(),
            userPref2: pref2.val().trim(),
            userPref3: pref3.val().trim(),
            aboutMe1: aboutMe1.val().trim(),
            aboutMe2: aboutMe2.val().trim(),
            aboutMe3: aboutMe3.val().trim(),
            securityQuestion1: security1.val().trim(),
            securityQuestion2: security2.val().trim()
        }

        console.log(userData)
        createNewUser(userData.first_name, userData.last_name, userData.email, userData.password, userData.age, userData.userPref1, userData.userPref2, userData.userPref3, userData.aboutMe1, userData.aboutMe2, userData.aboutMe3, userData.securityQuestion1, userData.securityQuestion2)



    })


    function createNewUser(first_name, last_name, email, password, age, userPref1, userPref2, userPref3, aboutMe1, aboutMe2, aboutMe3, securityQuestion1, securityQuestion2) {
        $.post("/api/signup", {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            age: age,
            userPref1: userPref1,
            userPref2: userPref2,
            userPref3: userPref3,
            aboutMe1: aboutMe1,
            aboutMe2: aboutMe2,
            aboutMe3: aboutMe3,
            securityQuestion1: securityQuestion1,
            securityQuestion2: securityQuestion2
        })
            .then(function (data) {
                console.log(data)
                // location.reload();
                // window.location.replace("/");

            })
    }
    // function handleLoginErr(err) {
    //     $("#alert .msg").text(err.responseJSON);
    //     $("#alert").fadeIn(500);
    // }


});