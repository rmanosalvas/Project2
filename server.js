// Required packages
const express = require("express");
const path = require("path");
// Define the port
const PORT = process.env.PORT || 8081;
const app = express();
// Sets up the Express app to handle data parsing
const db = require("./models")
const passport = require("./config/passport");
const exphbs = require("express-handlebars");
const dotenv = require('dotenv').config()
const session = require("express-session")


app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "/public")));
// Setup handlebars

app.use(session({ secret: "partynow", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Define the routes for the express routes
var routes = require("./routes/html-routes.js");
var routes2 = require("./routes/api-routes")
app.use(routes);
app.use(routes2);

// Start server listener
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});