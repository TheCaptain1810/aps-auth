const express = require("express");
const session = require("cookie-session");
const dotenv = require("dotenv");
dotenv.config();

const { PORT, SERVER_SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: SERVER_SESSION_SECRET, maxAge: 24 * 60 * 60 * 1000 })
);
app.use(require("../routes/auth.js"));

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

module.exports = app;
