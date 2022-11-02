const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DBPW,
    "database": process.env.DBNM,
    "host": "127.0.0.1",
    "dialect": "mysql"
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