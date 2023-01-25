const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Workout = require("../models/workoutSession");
const { checkAuth } = require("../middleware/checkAuth");

// router.get("/seed", seed); // DELETE!

// router.get("/", async (req, res) => {
//   // return [list of workouts]
//   try {
//     const workouts = await Workout.find().exec();
//     res.json(workouts);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

router.get("/", checkAuth, async (req, res) => {
  try {
    // Verify that the userId is present in the request query
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId in query" });
    }
    // Validate the userId to ensure it is a valid format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }
    // Use the userId to filter the results in the query
    // const workouts = await Workout.find({ userId: userId }).exec();
    const workouts = await Workout.find({ userId: userId })
      .sort({ workoutEnd: -1 })
      .exec();
    // Return the filtered results
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", checkAuth, async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const workouts = await Workout.findById(id);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
