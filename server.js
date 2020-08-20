// Required packages
const express = require("express");
// Define the port
const PORT = process.env.PORT || 8080;
const app = express();
// Sets up the Express app to handle data parsing
const db = require("./models")


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Setup handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Define the routes for the express routes
var routes = require("./routes/html-routes.js");
app.use(routes);



// Start server listener
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});