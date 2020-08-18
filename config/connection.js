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




{
  "development": {
    "username": "admin",
    "password": "Password123",
    "database": "dateapp",
    "host": "database-1.cafvzihsfdz1.us-west-2.rds.amazonaws.com",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "admin",
    "password": "Password123",
    "database": "dateapp",
    "host": "database-1.cafvzihsfdz1.us-west-2.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin",
    "password": "Password123",
    "database": "dateapp",
    "host": "database-1.cafvzihsfdz1.us-west-2.rds.amazonaws.com",
    "dialect": "mysql"
  }
}