const express = require("express");
const router = express.Router();
const path = require("path");
var db = require("../models");
const {
  response
} = require("express");
const isAuthenticated = require("../config/middleware/isAuthenticated.js")

// Route to Login in page
router.get("/", function (req, res) {
  if (req.user) {
    var hbsObj = {
      UserData: req.user
    }
    res.render("profile", hbsObj)
  }
  res.sendFile(path.join(__dirname, "../public/login.html"))

});
// Route for user creating a new account
router.get("/signup", function (req, res) {
  if (req.user) {
    var hbsObj = {
      UserData: req.user
    }
    res.render("profile", hbsObj)
  } else {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  }

});

router.get('/profile', isAuthenticated, (req, res) => {
  var hbsObj = {
    UserData: req.user
  }
  res.render("profile", hbsObj)

});

// main dashboard
router.get("/dashboard", isAuthenticated, function (req, res) {
  // Query posts for all posts
  db.Post.findAll({
    // Add order conditions here....
    order: [
      ['createdAt', 'DESC']
    ],
  }).then(function (postData) {
    console.log(postData)
    // create handle bars obj to be rendered
    var hbsObj = {
      Post: postData,
      UserData: req.user
    }
    res.render("dashboard", hbsObj);
  });
});

// Route to create a new date
router.get("/newpost", isAuthenticated, (req, res) => {
  var hbsObj = {
    UserData: req.user
  }
  res.render("newpost", hbsObj);
});

// Viewing other profiles by id
router.get("/profile/:id", isAuthenticated, function (req, res) {
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (profileFound){

    var hbsObj = {
      UserData: req.user,
      Profile: profileFound
    }
    res.render("profileView", hbsObj);
  })
});

// viewing all posts by id
router.get("/posts/:id", isAuthenticated, (req, res) => {
  
  db.Post.findAll({ where: { 
    Userid: req.params.id,

  },
  order: [
    ['createdAt', 'DESC']
  ],
}).then(function (usersPosts) {
    console.log(usersPosts)
    // create handle bars obj to be rendered
    var hbsObj = {
      Post: usersPosts,
      UserData: req.user
    }
    res.render("posts", hbsObj);
  })
});


// Matches



module.exports = router;