const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "can't be blank"],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      trim: true,
    },
    picture: {
      type: String,
      trim: true,
    },
    // userId: {
    //   type: String,
    //   trim: true,
    //   unique: true,
    //   index: true,
    // },
    // token: mongoose.Schema.Types.Mixed,
    weight: { type: String, enum: ["kg", "lbs"], trim: true, default: "kg" },
    distance: { type: String, enum: ["km", "mi"], trim: true, default: "km" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
