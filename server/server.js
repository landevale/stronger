// DEPENDENCIES
require("dotenv").config(); // configure reading from .env
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const { expressjwt: jwt } = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");

// Import
const authsController = require("./controllers/authsController");
const exercisesController = require("./controllers/exercisesController.js");
const routinesController = require("./controllers/routinesController.js");
const workoutsController = require("./controllers/workoutsController");

// CONFIGURATION
const app = express();
const PORT = process.env.PORT ?? 3000;

// MIDDLEWARE
// cors
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: "GET,POST,PUT,DELETE,OPTIONS",
//   })
// );
app.use(cors());

app.use(express.json());
// other middleware
app.use(express.json());
app.use(cookieParser());
// app.use(
//   jwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//     getToken: (req) => req.cookies.token,
//   })
// );
app.use(morgan("dev"));
app.use(express.static("../client/dist"));
app.use("/auth", authsController);
app.use("/api/exercises", exercisesController);
app.use("/api/routines", routinesController);
app.use("/api/workouts", workoutsController);

// Connect to Mongo
const mongoURI = process.env.SECRET_KEY;
const db = mongoose.connection;
mongoose.set("runValidators", true); // here is your global setting
mongoose.set("strictQuery", false);
mongoose.set("debug", true);
mongoose.connect(mongoURI);

// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

app.get("/api/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

// Listener
db.once("open", () => {
  console.log("connected to mongo", mongoURI);
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
});
