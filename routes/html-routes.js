const express = require("express");
const router = express.Router();

let User = require("../models/user.js")
// module.exports = function (app) {

    router.get("/"), (req, res) => {
        console.log(req);
        console.log("********************************");
        res.render("login");
        console.log(res);

    }


// }
module.exports = router;