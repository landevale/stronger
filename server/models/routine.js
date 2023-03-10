const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sample: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    exercises: [
      {
        name: { type: String, required: true },
        sets: [
          {
            reps: { type: Number, default: "" },
            weight: { type: Number, default: "" },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// routineSchema.index({ user_id: 1 });

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;
