var db = require("../models");
const express = require("express");
const router = express.Router();



router.post('/api/signup', (req, res) => {
    db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        userPref1: req.body.userPref1,
        userPref2: req.body.userPref2,
        userPref3: req.body.userPref3,
        aboutMe1: req.body.aboutMe1,
        aboutMe2: req.body.aboutMe2,
        aboutMe3: req.body.aboutMe3,
        securityQuestion1: req.body.securityQuestion1,
        securityQuestion2: req.body.securityQuestion2
    })
        .then(function () {
             res.json();
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
});




module.exports = router;