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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const routines = await Routine.findById(id);
    res.json(routines);
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
    const updatedRoutine = await Routine.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedRoutine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
