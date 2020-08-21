const express = require("express");
const router = express.Router();
const path = require("path");
var db = require("../models");

// Route to Login in page
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));

});

router.get("/signup", function(req, res) {
    res.render("signup");
});

router.get("/dashboard", function(req, res) {
    // Query posts for all posts
    db.Post.findAll({})
      .then(function(postData) {
          console.log(postData)
        // Define allpostData
        var hbsObj = {
            Post: postData
        }
        res.render("dashboard", hbsObj);
      });
});

module.exports = router;