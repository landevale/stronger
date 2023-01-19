const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutSession");
// const seed = require("../seed/seedRoutine");

// router.get("/seed", seed); // DELETE!

router.get("/", async (req, res) => {
  // return [list of workouts]
  try {
    const workouts = await Workout.find().exec();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  // Check for the presence of session data
  // if (!req.session.username) {
  //   res.status(401).send("Unauthorized");
  //   return;
  // }
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const workouts = await Workout.findById(id);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  // Check for the presence of session data
  // if (!req.session.username) {
  //   res.status(401).send("Unauthorized");
  //   return;
  // }
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
