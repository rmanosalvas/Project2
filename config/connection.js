var mysql = require("mysql");

var require("dotenv").config()
let connection;


if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}else{
  connection = mysql.createConnection({
  host: process.env.DB_HOST
  port: 3306,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB_NAME
});
}
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
