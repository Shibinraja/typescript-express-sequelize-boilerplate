require('dotenv').config();

const DB_Connection = {

  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_USERPASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    'jwtToken': process.env.JWT_SECRET,
    "dialect": "postgres",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

module.exports = DB_Connection;

