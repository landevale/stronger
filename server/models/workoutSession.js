const mongoose = require("mongoose");
const workoutSessionSchema = new mongoose.Schema(
  {
    routine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine",
      required: true,
    },
    date: { type: Date, required: true },
    notes: { type: String },
    rating: { type: Number },
    completed_exercises: [
      {
        exercise_name: { type: String, required: true },
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
const WorkoutSession = mongoose.model("WorkoutSession", workoutSessionSchema);
module.exports = WorkoutSession;
