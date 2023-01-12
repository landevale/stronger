const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exercises: [
      {
        name: { type: String, required: true },
        sets: [
          {
            reps: { type: Number, required: true },
            weight: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

routineSchema.index({ user_id: 1 });

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;
