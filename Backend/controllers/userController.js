const db = require("../db/db");
const { createUser, findUserByEmail } = require("../services/userService");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");

const getUserDetails = (req, res) => {
  const sql = "select * from uber_crud.users";

  db.query(sql, (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
};

const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname?.firstname || fullname.firstname.length < 3) {
    return res
      .status(400)
      .json({ error: "Firstname must be at least 3 characters." });
  }
  if (fullname.lastname && fullname.lastname.length < 3) {
    return res
      .status(400)
      .json({ error: "Lastname must be at least 3 characters." });
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser(
      fullname.firstname,
      fullname.lastname || null,
      email,
      hashedPassword
    );
    const token = generateToken({ id: result.insertId, email });
    res.status(201).json({
      user: {
        fullname: {
          firstname: fullname.firstname,
          lastname: fullname.lastname || "",
        },
        email: email,
      },
      token: token,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email already registered." });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await findUserByEmail(email);

    console.log("Found user:", user); // Debug: Check if the user exists

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Password valid:", isPasswordValid); // Debug: Check if the password matches

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Logout Controller
const logout = (req, res) => {
  // Invalidate token (client-side token removal is sufficient for stateless JWT)
  res.status(200).json({ message: "Logout successful." });
};

module.exports = { registerUser, getUserDetails, login, logout };
