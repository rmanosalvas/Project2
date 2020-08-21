const express = require("express");
const router = express.Router();
const path = require("path");
let User = require("../models/user.js")
let Post


// Route to Login in page
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));

});

router.get("/signup", function(req, res) {
    res.render("signup");
});
  
router.get("/dashboard", function(req, res) {
    post.all(function (allPosts){
        let hbsObj = {
            postTitle: allPosts.title,
            postCategory: allPosts.category
            allPosts.location
            allPosts.body



        }
        
    })
    res.render("dashboard");
});

module.exports = router;