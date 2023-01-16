const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise");
const seed = require("../seed/seedExercise");

router.get("/seed", seed); // DELETE!

router.get("/", async (req, res) => {
  // return [list of exercises]
  try {
    const exercises = await Exercise.find().exec();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const exercises = await Exercise.findById(id);
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
