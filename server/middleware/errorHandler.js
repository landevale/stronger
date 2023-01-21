const express = require("express");

const errorHandler = (err, req, res) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      message: "Invalid token",
    });
  } else {
    console.error(err);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

module.exports = errorHandler;
