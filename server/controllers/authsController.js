const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");
const jsonwebtoken = require("jsonwebtoken");
const { checkAuth } = require("../middleware/checkAuth");
const { authenticateJWT } = require("../middleware/authenticateJWT");
const { errorHandler } = require("../middleware/errorHandler");

// All routes that are defined under this router will be protected by the JWT.
// router.use(authenticateJWT);
// All routes defined under /api will be protected by the JWT
// router.use("/api", authenticateJWT, routes_to_protect);

/**
 *  This function is used verify a google account
 */

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const expirationTime = 24 * 60 * 60; // 1 day in seconds

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

router.post("/signup", async (req, res) => {
  try {
    // Verify credentials received from Google req.body
    console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const token = jsonwebtoken.sign(
        { email: profile?.email },
        process.env.JWT_SECRET,
        {
          expiresIn: expirationTime,
        }
      );

      // Check if user is already registered if yes, log in
      const user = await User.findOne({ email: profile.email }).exec();
      console.log("User findOne", user);
      if (user) {
        res.cookie("token", token, {
          //   expiresIn: expirationTime,
          expires: new Date(Date.now() + expirationTime * 1000),
          httpOnly: true,
        }); // The httpOnly: true setting means that the cookie can’t be read using JavaScript but can still be sent back to the server in HTTP requests.
        return res.status(201).json({
          message: "Login was successful",
          user: {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            picture: profile?.picture,
            email: profile?.email,
            sub: profile?.sub,
            id: user._id,
            // token: user.token,
          },
        });
      } else {
        // Else create new user
        console.log("Profile", profile);
        const newUser = await User.create({
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          sub: profile?.sub,
          // token: token,
        });
        console.log("New user created: ", newUser);
        res.cookie("token", token, {
          //   expiresIn: expirationTime,
          expires: new Date(Date.now() + expirationTime * 1000),
          httpOnly: true,
        });
        res.status(201).json({
          message: "Signup was successful",
          user: {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            picture: profile?.picture,
            email: profile?.email,
            sub: profile?.sub,
            id: newUser._id,
            token: jsonwebtoken.sign(
              { email: profile?.email },
              process.env.JWT_SECRET,
              {
                expiresIn: expirationTime,
              }
            ),
          },
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Verify credentials received from Google req.body
    if (req.body.credential) {
      console.log("Req cred", req.body.credential);
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const token = jsonwebtoken.sign(
        { email: profile?.email },
        process.env.JWT_SECRET,
        {
          expiresIn: expirationTime,
        }
      );

      console.log("Profile", profile);
      const user = await User.findOne({ email: profile.email });

      if (!user) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }
      res.cookie("token", token, {
        // expiresIn: expirationTime,
        expires: new Date(Date.now() + expirationTime * 1000),
        httpOnly: true,
      });
      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          sub: profile?.sub,
          id: user._id,
          token: jsonwebtoken.sign(
            { email: profile?.email },
            process.env.JWT_SECRET,
            {
              expiresIn: expirationTime,
            }
          ),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});

router.get("/profile", authenticateJWT, async (req, res) => {
  res.json({ msg: "Profile" });
});

module.exports = router;
