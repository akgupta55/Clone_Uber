const bcrypt = require("bcrypt");
const db = require("../db/db");

const createUser = async (firstname, lastname, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`;
    db.query(query, [firstname, lastname, email, password], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

module.exports = { createUser, findUserByEmail };
