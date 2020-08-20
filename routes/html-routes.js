const express = require("express");
const router = express.Router();

let User = require("../models/user.js")


// Route to Login in page
router.get("/", function(req, res) {
    res.render("index");
});

router.get("/signup", function(req, res) {
    res.render("signup");
});
  
router.get("/dashboard", function(req, res) {
    res.render("dashboard");
});

module.exports = router;