$(document).ready(function () {
    let loginForm = $(".form-login");
    let inputEmail = $("#inputEmail");
    let inputPassword = $("#inputPassword");

    loginForm.on("submit", function (e) {
        e.preventDefault();
        var userData = {
            email: inputEmail.val().trim(),
            password: inputPassword.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        };

        loginUser(userData.email, userData.password);
        inputEmail.val("");
        inputPassword.val("");
      });

      function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function(data) {
            window.location.href = "/profile";
            console.log(data);
        })
    }
});