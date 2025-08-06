import express from "express";
import session from "cookie-session";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
dotenv.config();

const { SERVER_SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: SERVER_SESSION_SECRET, maxAge: 24 * 60 * 60 * 1000 })
);
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

export default app;
