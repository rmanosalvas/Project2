var db = require("../models");
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// Create new user account in the DB
router.post('/api/signup', (req, res) => {
    db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        orientation: req.body.orientation,
        avatar: req.body.avatar,
        gender: req.body.gender,
        securityQuestion1: req.body.securityQuestion1,
        securityQuestion2: req.body.securityQuestion2,
        userPref1: req.body.userPref1,
        userPref2: req.body.userPref2,
        userPref3: req.body.userPref3,
        aboutMe1: req.body.aboutMe1,
        aboutMe2: req.body.aboutMe2,
        aboutMe3: req.body.aboutMe3,
        matches: req.body.matches,
        location: req.body.location
    })
        .then(function () {
          res.redirect(307, '/api/login');
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
});

  // GET route for getting all of the posts
  router.get("/api/posts/", function(req, res) {
    db.Post.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

// GET route for retrieving a single post
router.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

// Route for creating a new date
router.post("/api/posts", (req, res) => {
  console.log("*************************")
    console.log(req)
    console.log("*************************")
    db.Post.create({
        title: req.body.title,
        category: req.body.category,   
        location: req.body.location,
        body: req.body.body,
        interested: req.body.interested,
        UserId: req.user.id
    }).then((dbPost) => {
        // return the result in JSON format
        res.json(dbPost);
    }).catch((err) => {
        // if there are errors log them to the console
        console.log(err)
    });
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/api/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});

router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;