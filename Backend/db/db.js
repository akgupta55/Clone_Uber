const mysql = require("mysql");
// create a new MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qwerty@123",
  database: "uber_crud",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MYSQL database.");
});

module.exports = db;
