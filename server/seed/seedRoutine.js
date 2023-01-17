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
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
          ],
        },
        {
          name: "barbell bench press",
          sets: [
            {
              reps: 5,
              weight: "60",
            },
            {
              reps: 5,
              weight: "60",
            },
            {
              reps: 5,
              weight: "60",
            },
            {
              reps: 5,
              weight: "60",
            },
            {
              reps: 5,
              weight: "60",
            },
            {
              reps: 5,
              weight: "60",
            },
          ],
        },
        {
          name: "barbell bent over row",
          sets: [
            {
              reps: 5,
              weight: "50",
            },
            {
              reps: 5,
              weight: "50",
            },
            {
              reps: 5,
              weight: "50",
            },
            {
              reps: 5,
              weight: "50",
            },
            {
              reps: 5,
              weight: "50",
            },
            {
              reps: 5,
              weight: "50",
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
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
            {
              reps: 5,
              weight: "80",
            },
          ],
        },
        {
          name: "barbell standing close grip military press",
          sets: [
            {
              reps: 5,
              weight: "35",
            },
            {
              reps: 5,
              weight: "35",
            },
            {
              reps: 5,
              weight: "35",
            },
            {
              reps: 5,
              weight: "35",
            },
            {
              reps: 5,
              weight: "35",
            },
            {
              reps: 5,
              weight: "35",
            },
          ],
        },
        {
          name: "barbell deadlift",
          sets: [
            {
              reps: 5,
              weight: "100",
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
