const express = require("express");
const router = express.Router();
const Routine = require("../models/routine");
const seed = require("../seed/seedRoutine");

router.get("/seed", seed); // DELETE!

router.get("/", async (req, res) => {
  // return [list of routines]
  try {
    const routines = await Routine.find().exec();
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
