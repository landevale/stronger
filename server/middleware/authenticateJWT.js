const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

exports.authenticateJWT = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.token,
});
