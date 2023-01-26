const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Routine = require("../models/routine");
const seed = require("../seed/seedRoutine");
const { checkAuth } = require("../middleware/checkAuth");

router.get("/seed", seed); // DELETE!

// router.get("/", async (req, res) => {
//   // return [list of routines]
//   try {
//     const routines = await Routine.find().exec();
//     res.json(routines);
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
    const routines = await Routine.find({ userId: userId })
      .sort({
        createdAt: -1,
      })
      .exec();
    // Return the filtered results
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/sample/", checkAuth, async (req, res) => {
  try {
    const sample = req.query.sample;
    if (sample !== "true") {
      return res.status(400).json({ error: "Invalid sample format" });
    }
    const routines = await Routine.find({ sample: true }).exec();
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const routines = await Routine.findById(id);
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", checkAuth, async (req, res) => {
  try {
    const routine = await Routine.create(req.body);
    res.status(201).json(routine);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", checkAuth, async (req, res) => {
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

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log("userId: ", userId);
    const routine = await Routine.findOneAndDelete({ _id: id, userId: userId });
    if (!routine) {
      return res.status(404).json({ message: "Routine not found" });
    }
    res.status(200).json({ message: "Routine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
