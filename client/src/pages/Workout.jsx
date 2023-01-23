import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, FieldArray } from "formik";
import {
  Box,
  Button,
  Typography,
  Modal,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { workoutSchema } from "../schema/workoutSchema";
import { DataContext } from "../App";
import closeSvg from "../assets/close.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "85vh",
  overflow: "scroll",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Workout() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  const [msg, setMsg] = useState("");

  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());

  // Modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setStartDate(new Date().toISOString());
  }, []);

  const userId = "63ca4d543caafb82a0dfaa05";

  // fetch routine
  useEffect(() => {
    fetch(`/api/routines/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // to remove ._id of Routine to be sent with Workout data
        const dataWithoutId = Object.assign({}, data);
        delete dataWithoutId?._id;
        console.log("Data WO ID", dataWithoutId);
        formik.setValues(dataWithoutId);
        formik.setFieldValue("routineId", id);
        formik.setFieldValue("userId", userId);
        formik.setFieldValue("workoutStart", startDate);
        formik.setFieldValue("workoutEnd", endDate);
        console.log("Fetched Formik Values", formik.values);
        // formik.setValues(data);
        // console.log("Formik values", formik.values);
        // setRefresh(false); // Reset refresh to false
        setIsLoading(false);
        console.log("Fetch routine, data", data);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch routine");
        setIsLoading(false);
      });
  }, []);

  const [exercises, setExercises] = useState([]);
  const [isExercisesLoading, setIsExercisesLoading] = useState(true);
  const [exercisesErrorMessage, setExercisesErrorMessage] = useState(""); // State to display error message

  // fetch lists of all exercises
  useEffect(() => {
    fetch("/api/exercises/")
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
        // setRefresh(false); // Reset refresh to false
        setIsExercisesLoading(false);
        console.log(data);
      })
      .catch(() => {
        setExercisesErrorMessage("Unable to fetch exercises");
        setIsExercisesLoading(false);
      });
  }, []);

  const [currentErrors, setCurrentErrors] = useState([]);

  // useEffect(() => {
  //   formik.values.routineId = id;
  //   formik.values.userId = userId;
  //   formik.values.workoutStart = startDate;
  //   formik.values.workoutEnd = endDate;
  // }, [startDate, endDate]);

  useEffect(() => {
    // formik.setFieldValue("routineId", id);
    // formik.setFieldValue("userId", userId);
    // formik.setFieldValue("workoutStart", startDate);
    formik.setFieldValue("workoutEnd", endDate);
  }, [endDate]);

  const handleEndDate = () => {
    setEndDate(new Date().toISOString(), () => {
      // callback function
      console.log(endDate);
      formik.values.workoutEnd = endDate;
    });
  };

  const runValidations = (data) => {
    workoutSchema
      .validate(data, { abortEarly: false })
      .then((responseData) => {
        console.log("no validation errors");
        console.log(responseData);
        setCurrentErrors([]);
      })
      .catch((err) => {
        console.log("Validation data", data);
        console.log(err);
        console.log(err.name); // ValidationError
        console.log("validation errors:", err.inner);
        console.log(err.errors);
        setCurrentErrors(err.errors);
      });
  };

  // const initialValues = {
  //   name: "",
  //   routineId: id,
  //   userId: userId,
  //   workoutStart: startDate,
  //   workoutEnd: endDate,
  //   notes: "",
  //   rating: "",
  //   exercises: [{ name: "" }, { sets: { reps: "", weight: "" } }],
  //   _id: "",
  // };

  const [initialValues, setInitialValues] = useState({
    name: "",
    routineId: id,
    userId: userId,
    workoutStart: startDate,
    workoutEnd: endDate,
    notes: "",
    rating: "",
    exercises: [{ name: "" }, { sets: { reps: "", weight: "" } }],
    _id: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: workoutSchema,
    onSubmit: async (values) => {
      try {
        handleEndDate();
        console.log("End date onSubmit", endDate); // check if endDate is set correctly
        values.routineId = id;
        values.userId = userId;
        values.workoutStart = startDate;
        values.workoutEnd = endDate;
        // Filter sets that are selected and remove any exercises that have an empty sets array
        values.exercises.forEach((exercise) => {
          exercise.sets = exercise.sets.filter((set) => set.selected);
        });
        values.exercises = values.exercises.filter(
          (exercise) => exercise.sets.length > 0
        );
        console.log(values);
        const isValid = await workoutSchema.isValid(values);
        console.log("Is values valid?", isValid);
        const response = await fetch(`/api/workouts/`, {
          method: "POST",
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
      } catch (error) {
        console.log(values);
        console.log("Error", error);
        setMsg("Something went wrong!");
        setMsg(error);
      }
    },
  });

  useEffect(() => {
    console.log("Formik values", formik.values);
  }, [formik.values]);

  // Checks if exercise is already in the workout, if not, add it
  const handleCardClick = (exercise) => {
    if (!formik.values.exercises.filter((e) => e.id === exercise.id).length) {
      formik.setValues({
        ...formik.values,
        exercises: [
          ...formik.values.exercises,
          {
            name: exercise.name,
            sets: [{ reps: "", weight: "" }],
            _id: exercise._id,
          },
        ],
      });
    }
  };

  return (
    <FormikProvider value={formik}>
      <Box sx={{ maxWidth: 345 }}>
        <fieldset style={{ maxWidth: 345 }}>
          <legend>Workout!</legend>
          <form onSubmit={formik.handleSubmit} style={{ maxWidth: 345 }}>
            {/* <input type="hidden" name="routineId" value={id} />
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="workoutStart" value={startDate} />
            <input type="hidden" name="workoutEnd" value={endDate} /> */}
            <input
              name="routineId"
              onChange={formik.handleChange}
              value={formik.values.routineId}
            />
            <input
              name="userId"
              onChange={formik.handleChange}
              value={formik.values.userId}
            />
            <input
              name="workoutStart"
              onChange={formik.handleChange}
              value={formik.values.workoutStart}
            />
            <input
              name="workoutEnd"
              onChange={formik.handleChange}
              value={formik.values.workoutEnd}
            />

            <label>
              Workout:
              <input
                type="text"
                name="name"
                value={formik.values.name}
                default={formik.values.name}
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
                    <>
                      <label key={exercise._id}>
                        <Link to={`/exercise/${exercise._id}`}>
                          <Typography variant="h5" component="div">
                            {exercise.name}
                          </Typography>
                        </Link>

                        <Table style={{ maxWidth: 345 }} border="1">
                          <TableHead style={{ maxWidth: 345 }}>
                            <TableRow>
                              <TableCell style={{ maxWidth: 60 }}>
                                Set
                              </TableCell>
                              <TableCell>KG/LBS</TableCell>
                              <TableCell>Reps</TableCell>
                              <TableCell style={{ maxWidth: 60 }}>
                                Completed
                              </TableCell>
                              <TableCell style={{ maxWidth: 60 }}>
                                Delete Set
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <FieldArray
                            name={`exercises[${exerciseIndex}].sets`}
                            render={(arrayHelpers) => (
                              <>
                                {exercise.sets &&
                                  Array.isArray(exercise.sets) &&
                                  exercise.sets.map((set, setIndex) => (
                                    // {exercise?.sets?.map((set, setIndex) => (
                                    <>
                                      <TableRow key={setIndex._id}>
                                        <TableCell
                                          style={{ minWidth: 30, maxWidth: 30 }}
                                        >
                                          {setIndex + 1}
                                        </TableCell>
                                        <TableCell>
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
                                            style={{ maxWidth: 50 }}
                                          />
                                          {/* {set.weight} */}
                                        </TableCell>

                                        <TableCell>
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
                                            style={{ maxWidth: 50 }}
                                          />
                                          {/* {set.reps} */}
                                        </TableCell>

                                        <TableCell>
                                          <input
                                            type="checkbox"
                                            name={`exercises[${exerciseIndex}].sets[${setIndex}].selected`}
                                            checked={
                                              formik.values.exercises[
                                                exerciseIndex
                                              ].sets[setIndex].selected
                                            }
                                            onChange={(event) => {
                                              formik.setFieldValue(
                                                `exercises[${exerciseIndex}].sets[${setIndex}].selected`,
                                                event.target.checked
                                              );
                                              if (event.target.checked) {
                                                setEndDate(
                                                  new Date().toISOString()
                                                );
                                              }
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell
                                          sx={{ p: 0, m: 0, maxWidth: 30 }}
                                        >
                                          <Button
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.remove(setIndex)
                                            } // remove a set from the list
                                            sx={{ p: 0, m: 0, maxWidth: 30 }}
                                          >
                                            <img
                                              src={closeSvg}
                                              style={{
                                                width: 25,
                                                fill: "red",
                                                stroke: "red",
                                              }}
                                            />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  ))}
                                <TableRow>
                                  <TableCell colspan="4">
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          reps: "",
                                          weight: "",
                                        })
                                      }
                                    >
                                      Add Set
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </>
                            )}
                          />

                          <TableCell colspan="4">
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.remove(exerciseIndex)} // remove an exercise from the list
                              sx={{ color: "red" }}
                            >
                              Delete Exercise
                            </Button>
                          </TableCell>
                        </Table>
                      </label>
                      <br />
                    </>
                  ))}
                </div>
              )}
            />

            <Button onClick={handleOpen}>Add Exercise</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Exercise
                </Typography>
                {exercises.map((ele) => (
                  <Card key={ele._id}>
                    <CardActionArea
                      sx={{
                        display: "flex",
                        maxWidth: 345,
                        flexDirection: "row",
                      }}
                      onClick={() => handleCardClick(ele)}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 100 }}
                        // image={ele.gifUrl}
                        alt={ele.name}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {ele.name}
                            {/* Exercise Name */}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {ele.bodyPart}
                            {/* Body Part */}
                          </Typography>
                        </CardContent>
                      </Box>
                    </CardActionArea>
                  </Card>
                ))}
                <Button onClick={handleClose}>CLOSE</Button>
              </Box>
            </Modal>

            <br />
            <br />

            <Button type="submit">Finish Workout</Button>
            <p>{msg}</p>

            <div>
              <button type="button" onClick={runValidations}>
                run validations
              </button>
            </div>
            <div>
              current errors
              {currentErrors.map((e) => {
                return (
                  <div style={{ color: "red" }} key={e}>
                    {e}
                  </div>
                );
              })}
            </div>
          </form>
        </fieldset>
      </Box>
    </FormikProvider>
  );
}

export default Workout;
