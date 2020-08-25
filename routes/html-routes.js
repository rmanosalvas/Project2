const express = require("express");
const router = express.Router();
const path = require("path");
var db = require("../models");
const { response } = require("express");
const isAuthenticated = require("../config/middleware/isAuthenticated.js")



// Route to Login in page
router.get("/", function(req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/profile.html"))
      }
    res.sendFile(path.join(__dirname, "../public/login.html"));

});
// Route for user creating a new account
router.get("/signup", function(req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/profile.html"))
    } else {
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    }
      
});

router.get('/profile', isAuthenticated, (req, res) => {

    res.sendFile(path.join(__dirname, "../public/profile.html"));

});

router.get("/dashboard", isAuthenticated, function(req, res) {
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
router.get("/newpost", isAuthenticated, (req, res) => {
    // add the google places api to the res
    res.sendFile(path.join(__dirname, "../public/newPost.html"))
});


module.exports = router;