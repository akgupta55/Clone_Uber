const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/db");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world !");
});

app.use("/users", userRoutes);

module.exports = app;
