import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, Field, FieldArray } from "formik";
import { Button, Typography } from "@mui/material";
import { routineSchema } from "../schema/routineSchema";
import { DataContext } from "../App";

function EditRoutine() {
  const { id } = useParams();
  const [routine, setRoutine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  //   const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [msg, setMsg] = useState("");

  const initialValues = {
    name: "",
    user_id: "",
    exercises: [{ name: "" }, { sets: { reps: "", weight: "" } }],
  };

  // fetch routine
  useEffect(() => {
    fetch(`/api/routines/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRoutine(data);
        setFormState(data);
        formik.setValues(data);
        // console.log("Formik values", formik.values);
        // setRefresh(false); // Reset refresh to false
        setIsLoading(false);
        console.log(data);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch routine");
        setIsLoading(false);
      });
  }, [id]);

  // useEffect(() => {
  //   console.log("Formstate", formState);
  // }, [formState]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: routineSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/api/routines/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        console.log(data);
        // navigate("/courses");
      } catch (error) {
        console.log(values);
        setMsg("Something went wrong!");
      }
    },
  });

  // useEffect(() => {
  //   console.log("Formik values", formik.values);
  // }, [formik.values]);

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

  return (
    <FormikProvider value={formik}>
      <div>
        <fieldset>
          <legend>Edit Routine</legend>
          <form onSubmit={formik.handleSubmit}>
            <label>
              Routine:
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </label>
            {/* If validation is not passed show errors */}
            <p className="error">
              {formik.errors.name && formik.touched.name && formik.errors.name}
            </p>
            <FieldArray
              name="exercises"
              render={(arrayHelpers) => (
                <div>
                  {formik?.values?.exercises?.map((exercise, exerciseIndex) => (
                    // {formState?.exercises?.map((exercise) => (
                    <>
                      <label key={exercise._id}>
                        <Link to={`/exercise/${exercise._id}`}>
                          <Typography variant="h5" component="div">
                            {exercise.name}
                          </Typography>
                        </Link>

                        <table border="1">
                          <tr>
                            <th>Set</th>
                            <th>KG/LBS</th>
                            <th>Reps</th>
                            <th>Delete</th>
                          </tr>
                          <FieldArray
                            name={`exercises[${exerciseIndex}].sets`}
                            render={(arrayHelpers) => (
                              <>
                                {exercise.sets &&
                                  Array.isArray(exercise.sets) &&
                                  exercise.sets.map((set, setIndex) => (
                                    // {exercise?.sets?.map((set, setIndex) => (
                                    <>
                                      <tr key={setIndex._id}>
                                        <td>{setIndex + 1}</td>
                                        <td>
                                          <input
                                            type="number"
                                            name={`exercises[${exerciseIndex}].sets[${setIndex}.weight]`}
                                            value={
                                              formik.values.exercises[
                                                exerciseIndex
                                              ].sets[setIndex].weight
                                            }
                                            placeholder="Weight"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                          />
                                          {/* {set.weight} */}
                                        </td>

                                        <td>
                                          <input
                                            type="number"
                                            name={`exercises[${exerciseIndex}].sets[${setIndex}.reps]`}
                                            value={
                                              formik.values.exercises[
                                                exerciseIndex
                                              ].sets[setIndex].reps
                                            }
                                            placeholder="Reps"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                          />
                                          {/* {set.reps} */}
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            // onClick={() =>
                                            //   handleDeleteSet(exerciseIndex, setIndex)
                                            // }
                                            // onClick={() =>
                                            //   handleDeleteExercise(
                                            //     exerciseIndex,
                                            //     setIndex
                                            //   )
                                            // }
                                            onClick={() =>
                                              arrayHelpers.remove(setIndex)
                                            } // remove a set from the list
                                          >
                                            Delete Set
                                          </button>
                                        </td>
                                      </tr>
                                    </>
                                  ))}
                                {/* <Button
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.insert(setIndex, "")
                                  } // insert an empty string at a position
                                >
                                  Add Set
                                </Button> */}
                                <Button
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.push({ reps: "", weight: "" })
                                  }
                                >
                                  Add Set
                                </Button>
                              </>
                            )}
                          />

                          <div>
                            <Button
                              type="button"
                              // onClick={() => handleDeleteExercise(exerciseIndex)}
                              onClick={() => arrayHelpers.remove(exerciseIndex)} // remove an exercise from the list
                            >
                              Delete Exercise
                            </Button>
                          </div>
                        </table>
                      </label>
                      <br />
                    </>
                  ))}
                </div>
              )}
            />
            <Button>Add Exercise</Button>

            <br />
            <br />

            <button type="submit">Edit Routine</button>
            <p>{msg}</p>
          </form>
        </fieldset>
      </div>
    </FormikProvider>
  );
}

export default EditRoutine;
