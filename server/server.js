// DEPENDENCIES
require("dotenv").config(); // configure reading from .env
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
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
app.use("/api/exercises", exercisesController);
app.use("/api/routines", routinesController);
app.use("/auth", authsController);
// app.use("/api/users", usersController);
// app.use("/api/sessions", sessionsController);

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

/**
 *  This function is used verify a google account
 */

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// async function verifyGoogleToken(token) {
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: GOOGLE_CLIENT_ID,
//     });
//     return { payload: ticket.getPayload() };
//   } catch (error) {
//     return { error: "Invalid user detected. Please try again" };
//   }
// }

// app.post("/api/signup", async (req, res) => {
//   // app.post("/api/signup", (req, res) => {
//   try {
//     console.log({ verified: verifyGoogleToken(req.body.credential) });
//     if (req.body.credential) {
//       const verificationResponse = await verifyGoogleToken(req.body.credential);
//       // const verificationResponse = verifyGoogleToken(req.body.credential);
//       if (verificationResponse.error) {
//         return res.status(400).json({
//           message: verificationResponse.error,
//         });
//       }

//       const profile = verificationResponse?.payload;
//       const token = jwt.sign(
//         { email: profile?.email },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "1d",
//         }
//       );
//       // //! What is DB?
//       // DB.push(profile);
//       // console.log(profile);

//       // Check if user is already registered
//       const user = await User.findOne({ email: profile.email }).exec();
//       // const user = User.findOne({ email: profile.email });
//       console.log("User findOne", user);
//       if (user) {
//         return res.status(201).json({
//           message: "Login was successful",
//           user: {
//             firstName: profile?.given_name,
//             lastName: profile?.family_name,
//             picture: profile?.picture,
//             email: profile?.email,
//             userId: profile?.sub,
//             token: user.token,
//           },
//         });
//       } else {
//         // Create new user
//         // const newUser = new User({ ...profile, token });
//         // await newUser.save();
//         // newUser.save();
//         console.log("Else block");
//         console.log("Profile", profile);
//         const newUser = await User.create({
//           firstName: profile?.given_name,
//           lastName: profile?.family_name,
//           picture: profile?.picture,
//           email: profile?.email,
//           userId: profile?.sub,
//           token: token,
//         });
//         console.log("New user created: ", newUser);

//         res.status(201).json({
//           message: "Signup was successful",
//           user: {
//             firstName: profile?.given_name,
//             lastName: profile?.family_name,
//             picture: profile?.picture,
//             email: profile?.email,
//             userId: profile?.sub,
//             token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
//               expiresIn: "1d",
//             }),
//           },
//         });
//       }
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred. Registration failed.",
//     });
//   }
// });

// app.post("/api/login", async (req, res) => {
//   // app.post("/api/login", (req, res) => {
//   try {
//     if (req.body.credential) {
//       console.log("Req cred", req.body.credential);
//       const verificationResponse = await verifyGoogleToken(req.body.credential);
//       // const verificationResponse = verifyGoogleToken(req.body.credential);
//       if (verificationResponse.error) {
//         return res.status(400).json({
//           message: verificationResponse.error,
//         });
//       }

//       const profile = verificationResponse?.payload;
//       console.log("Profile", profile);
//       const user = await User.findOne({ email: profile.email });
//       // const user = User.findOne({ email: profile.email });

//       if (!user) {
//         return res.status(400).json({
//           message: "You are not registered. Please sign up",
//         });
//       }

//       res.status(201).json({
//         message: "Login was successful",
//         user: {
//           firstName: profile?.given_name,
//           lastName: profile?.family_name,
//           picture: profile?.picture,
//           email: profile?.email,
//           userId: profile?.sub,
//           token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
//             expiresIn: "1d",
//           }),
//         },
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error?.message || error,
//     });
//   }
// });

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
