const Routine = require("../models/routine");

const seed = async (req, res) => {
  const seedRoutines = [
    {
      name: "StrongLift 5x5 - Workout A",
      //   user_id: "",
      exercises: [
        {
          name: "barbell full squat",
          sets: [
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
          ],
        },
        {
          name: "barbell bench press",
          sets: [
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
          ],
        },
        {
          name: "barbell bent over row",
          sets: [
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
          ],
        },
      ],
    },
    {
      name: "StrongLift 5x5 - Workout B",
      //   user_id: "",
      exercises: [
        {
          name: "barbell full squat",
          sets: [
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
          ],
        },
        {
          name: "barbell standing close grip military press",
          sets: [
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
            {
              reps: 5,
              weight: "",
            },
          ],
        },
        {
          name: "barbell deadlift",
          sets: [
            {
              reps: 5,
              weight: "",
            },
          ],
        },
      ],
    },
  ];
  await Routine.deleteMany({});

  const routines = await Routine.insertMany(seedRoutines);

  res.json(routines);
};

module.exports = seed;
