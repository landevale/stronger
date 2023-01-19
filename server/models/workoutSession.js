const mongoose = require("mongoose");
const workoutSessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine",
    },
    routine_name: { type: String, required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    rating: { type: Number },
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
workoutSessionSchema.index({ user_id: 1 });
const WorkoutSession = mongoose.model("WorkoutSession", workoutSessionSchema);
module.exports = WorkoutSession;
