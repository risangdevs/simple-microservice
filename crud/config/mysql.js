const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database:"simplemicroservice"
});

module.exports = mysqlConnection;
