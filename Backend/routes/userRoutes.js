const express = require("express");
const {
  getUserDetails,
  login,
  logout,
} = require("../controllers/userController");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

router.get("/getuserdetails", getUserDetails);
router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
