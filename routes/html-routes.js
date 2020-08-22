const express = require("express");
const router = express.Router();
const path = require("path");
var db = require("../models");

// Route to Login in page
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));

});
// Route for user creating a new account
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

// Route to create a new date
router.get("/newpost", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/newPost.html"))
});


module.exports = router;