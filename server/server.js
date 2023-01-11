// DEPENDENCIES
require("dotenv").config();
const path = require("path");
const express = require("express");
// const session = require("express-session");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// CONFIGURATION
const app = express();
const PORT = process.env.PORT ?? 3000;

// MIDDLEWARE
// session
// app.set("trust proxy", 1); // trust first proxy
// app.use(
//   session({
//     // store: store,
//     // store: new MongoStore({
//     //   url: process.env.SECRET_SESSION,
//     //   collection: "sessions",
//     // }),
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 604800000,
//     }, // expires in 1 week
//     // cookie: { secure: true },
//   })
// );
// other middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("../client/dist"));
// app.use("/api/bookings", bookingsController);
// app.use("/api/cohorts", cohortsController);
// app.use("/api/users", usersController);
// app.use("/sessions", sessionsController);

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
