const mongoose = require("mongoose");
const workoutSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine",
    },
    name: { type: String, required: true },
    workoutStart: { type: Date, required: true },
    workoutEnd: { type: Date, required: true },
    notes: { type: String },
    rating: { type: Number },
    exercises: [
      {
        name: { type: String, required: true },
        sets: [
          {
            reps: { type: Number, required: true },
            weight: { type: Number },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
// workoutSessionSchema.index({ user_id: 1 });

const WorkoutSession = mongoose.model("WorkoutSession", workoutSessionSchema);
module.exports = WorkoutSession;
