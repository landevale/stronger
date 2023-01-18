// const handleDeleteExercise = (exerciseIndex) => {
//   formik.setValues({
//     ...formik.values,
//     exercises: formik.values.exercises.filter(
//       (exercise, i) => i !== exerciseIndex
//     ),
//   });
// };

// const handleDeleteExercise = (exerciseIndex) => {
//   const exercises = [...formik.values.exercises];
//   exercises.splice(exerciseIndex, 1);
//   formik.setValues({
//     ...formik.values,
//     exercises,
//   });
// };

// const handleDeleteExercise = (exerciseIndex) => {
//   const newExercises = [...formik.values.exercises];
//   newExercises.splice(exerciseIndex, 1);
//   formik.setValues({
//     ...formik.values,
//     exercises: newExercises,
//   });
// };

// //? Combined handleDeleteSet & handleDeleteExercise
// const handleDeleteExercise = (exerciseIndex, setIndex) => {
//   const exercises = [...formik.values.exercises];
//   if (setIndex !== undefined) {
//     if (setIndex === exercises[exerciseIndex].sets.length - 1) {
//       exercises[exerciseIndex].sets.splice(setIndex, 1);
//     } else {
//       exercises[exerciseIndex].sets.splice(setIndex, 1);
//     }
//   } else {
//     exercises.splice(exerciseIndex, 1);
//   }
//   formik.setValues({
//     ...formik.values,
//     exercises,
//   });
// };

//! Conflicts with handleDeleteExercise
// Check if current exerciseIndex === passed exerciseIndex
// If true, create new copy of array except with the specified setIndex
// If not, return exercise

// const handleDeleteSet = (exerciseIndex, setIndex) => {
//   formik.setValues({
//     ...formik.values,
//     exercises: formik.values.exercises.map((exercise, i) =>
//       i === exerciseIndex
//         ? {
//             ...exercise,
//             sets: exercise.sets.filter((set, j) => j !== setIndex),
//           }
//         : exercise
//     ),
//   });
// };

// const handleDeleteSet = (exerciseIndex, setIndex) => {
//   const exercises = [...formik.values.exercises];
//   exercises[exerciseIndex].sets = exercises[exerciseIndex].sets.filter(
//     (set, i) => i !== setIndex
//   );
//   formik.setValues({
//     ...formik.values,
//     exercises,
//   });
// };

// const handleDeleteSet = (exerciseIndex, setIndex) => {
//   const exercises = [...formik.values.exercises];
//   const newSets = [...exercises[exerciseIndex].sets];
//   newSets.splice(setIndex, 1);
//   exercises[exerciseIndex].sets = newSets;
//   formik.setValues({
//     ...formik.values,
//     exercises,
//   });
// };

// const handleDeleteSet = (exerciseIndex, setIndex) => {
//   const exercises = [...formik.values.exercises];
//   exercises[exerciseIndex].sets.splice(setIndex, 1);
//   formik.setValues({
//     ...formik.values,
//     exercises,
//   });
// };

// const handleDeleteSet = (exerciseIndex, setIndex) => {
//   const exercises = [...formik.values.exercises];
//   if (setIndex === exercises[exerciseIndex].sets.length - 1) {
//     exercises.splice(exerciseIndex, 1);
//   } else {
//     exercises[exerciseIndex].sets.splice(setIndex, 1);
//   }
//   formik.setValues({
//     ...formik.values,
//     exercises,
//   });
// };

// Testing Validation fixing errors
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

routineSchema
  .validate(seedRoutines, { abortEarly: false })
  .then(() => {
    console.log("Validation passed");
    // Your code here, if validation passed
  })
  .catch((err) => {
    console.log("Validation failed:", err.errors);
    // Your code here, if validation failed
  });
