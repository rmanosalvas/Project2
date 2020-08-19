$(function () {
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");



    loginForm.on("click", function (event) {
        event.preventDefault();

    });
    $(".register-user").on("click", function (event) {
        event.preventDefault();

    });
});