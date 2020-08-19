/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "passport_demo",
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "passport_demo",
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "passport_demo",
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
}