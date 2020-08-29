const db = require("../models");
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const {  response } = require("express");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");
const { profile } = require("console");
const multer  = require('multer')
const toButcketFS = require("../config/middleware/toButcketFS.js");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// ######################################################
// saving profile picture to AWS S3 #####################
// ######################################################

// Create new user account in the DB
router.post('/api/signup', (req, res) => {
  db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      orientation: req.body.orientation,
      avatar: "https://dateapppbucket.s3-us-west-2.amazonaws.com/"+req.body.avatar,
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
// ######################################################
// saving profile picture to AWS S3 #####################
// ######################################################
router.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log("the BODY********************************************")
    console.log(req.file)

  toButcketFS((req.file.buffer), (req.file.originalname))
  console.log("MIDDLE WARE RAN ********************************************^")


})


// GET route for getting all of the posts
router.get("/api/posts/", function (req, res) {
  db.Post.findAll({
      order: ["createdAt", "DESC"],
    })
    .then(function (dbPost) {
      res.json(dbPost);
    });
});

// GET route for retrieving a single post
router.get("/api/posts/:id", isAuthenticated, function (req, res) {
  db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function (dbPost) {
      let hbObj = {
        Post: dbPost,
        UserData: req.user
      }
      res.render("post", hbObj)
    });
});

// Route for creating a new date
router.post("/api/posts", (req, res) => {
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

// creating a new match
router.post("/api/matches/:id", (req, res) => {
  db.match.create({
    user1: req.body.user1,
    user2: req.body.user2,
    UserId: req.body.UserId
  },
  ).then((newMatch) => {
    // return the result in JSON format
    res.json(newMatch);
  }).catch((err) => {
    // if there are errors log them to the console
    console.log(err)
  });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

router.get("/api/user_data", function (req, res) {
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
  };

});


router.put("/api/profile/:id", upload.single('avatar'), function (req, res) {
  db.User.update(
    { avatar : req.body.avatar,
      location: req.body.location,
      aboutMe1: req.body.aboutMe1,
      aboutMe2: req.body.aboutMe2,
      aboutMe3: req.body.aboutMe3,
      userPref1: req.body.userPref1,
      userPref2: req.body.userPref2,
      userPref3: req.body.userPref3,
    },{ where : { id: req.params.id}},
  ).then(function (result) {
    res.json(result);
})


});

router.put("/api/post/", function (req, res) {
  db.Post.update(
    req.post.interested, {
    where: {  
    },
  }).then(function (dbPost) {
    res.json(dbPost);
  });


})

// get user info
router.get("/user/:id", (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (UserFound){
    console.log(UserFound)
    var userSearch = {
      UserData: req.user,
      Profile: UserFound
    }
    res.json(userSearch)
  })
});


module.exports = router;