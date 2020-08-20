const express = require("express");
const router = express.Router();

let User = require("../models/user.js")

router.get("/", function(req, res) {
    res.render("login");
});
  


module.exports = router;