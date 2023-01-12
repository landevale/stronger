const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    bodyPart: { type: String, trim: true },
    equipment: { type: String, trim: true },
    gifUrl: { type: String, trim: true },
    id: { type: String, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    target: { type: String, trim: true },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
