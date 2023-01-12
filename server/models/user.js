const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true, // Unique index. If you specify `unique: true`
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true, // specifying `index: true` is optional if you do `unique: true`
      trim: true,
    },
    password: { type: String, minlength: 8, required: true },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      trim: true,
    },
    weight: { type: String, enum: ["kg", "lbs"], trim: true, default: "kg" },
    distance: { type: String, enum: ["km", "mi"], trim: true, default: "km" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
