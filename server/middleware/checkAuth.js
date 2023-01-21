const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

exports.checkAuth = async (req, res, next) => {
  let token = req.header("authorization");

  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized",
        },
      ],
    });
  }

  token = token.split(" ")[1];

  try {
    const user = await jsonwebtoken.verify(token, process.env.JWT_SECRET);

    req.user = user.email;
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized",
        },
      ],
    });
  }
};
