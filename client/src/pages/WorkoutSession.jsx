import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, FieldArray } from "formik";
import {
  Box,
  Button,
  Container,
  Modal,
  Snackbar,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { workoutSchema } from "../schema/workoutSchema";
import AddExerciseModal from "../components/AddExerciseModal";
import CountdownTimer from "../components/CountdownTimer";
import closeSvg from "../assets/close.svg";
import chronometerSvg from "../assets/chronometer.svg";
import { UserContext } from "../context/context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function WorkoutSession() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  const [msg, setMsg] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());

  // ExerciseModal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //
  // Timer Modal states
  const [openTimer, setOpenTimer] = useState(false);
  const handleTimerOpen = () => setOpenTimer(true);
  const handleTimerClose = () => setOpenTimer(false);
  //

  // useEffect(() => {
  //   setStartDate(new Date().toISOString());
  // }, []);

  // Authentication
  const userId = user.user.id;
  const token = localStorage.getItem("token");
  const headers = {
    authorization: "Bearer " + token,
  };

  // Fetch routine
  useEffect(() => {
    fetch(`/api/routines/${id}`, { headers: headers })
      .then((response) => response.json())
      .then((data) => {
        // to remove ._id of Routine to be sent with Workout data
        const dataWithoutId = Object.assign({}, data);
        delete dataWithoutId?._id;
        console.log("Data WO ID", dataWithoutId);
        formik.setValues(dataWithoutId);
        formik.setFieldValue("name", dataWithoutId.name);
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

  const [currentErrors, setCurrentErrors] = useState([]);

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

  // const runValidations = (data) => {
  //   workoutSchema
  //     .validate(data, { abortEarly: false })
  //     .then((responseData) => {
  //       console.log("no validation errors");
  //       console.log(responseData);
  //       setCurrentErrors([]);
  //     })
  //     .catch((err) => {
  //       console.log("Validation data", data);
  //       console.log(err);
  //       console.log(err.name); // ValidationError
  //       console.log("validation errors:", err.inner);
  //       console.log(err.errors);
  //       setCurrentErrors(err.errors);
  //     });
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
  });

  const formik = useFormik({
    validateOnMount: true,
    initialValues: initialValues,
    enableReinitialize: true,
    // validationSchema: workoutSchema,
    onSubmit: async (values) => {
      try {
        handleEndDate();
        console.log("End date onSubmit", endDate); // check if endDate is set correctly
        values.routineId = id;
        values.userId = userId;
        values.workoutStart = startDate;
        values.workoutEnd = endDate;
        // Filter sets that are selected and remove any exercises that have an empty sets array
        // values.exercises.forEach((exercise) => {
        //   exercise.sets = exercise.sets.filter((set) => set.selected);
        // });
        // Filter sets that are selected and have no values for reps
        values.exercises.forEach((exercise) => {
          exercise.sets = exercise.sets.filter(
            (set) => set.selected && set.reps
          );
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        console.log(data);
        navigate("/history");
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

  // Checks if the exercise is already in the list then handles the adding of exercises to the routine
  const handleCardClick = (exercise) => {
    if (
      !formik.values.exercises.filter((e) => e.name === exercise.name).length
    ) {
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
      handleClose(); // Close the modal
      setSnackbarMsg("Exercise added to workout"); // Set snackbar message
    }
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Container maxWidth={false}>
          <Box sx={{ maxWidth: 345 }}>
            <fieldset style={{ maxWidth: 345 }}>
              <legend>Workout!</legend>
              <form onSubmit={formik.handleSubmit} style={{ maxWidth: 345 }}>
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
                  />
                </label>
                {/* If validation is not passed show errors */}
                <p className="error">
                  {formik.errors.name &&
                    formik.touched.name &&
                    formik.errors.name}
                </p>
                <Button onClick={handleTimerOpen}>
                  Open Countdown Timer{" "}
                  <img
                    src={chronometerSvg}
                    style={{
                      width: 25,
                      fill: "red",
                      stroke: "red",
                    }}
                  />
                </Button>
                <Modal
                  open={openTimer}
                  onClose={handleTimerClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Countdown Timer{" "}
                    </Typography>
                    <CountdownTimer />
                    <Button onClick={handleTimerClose}>SKIP</Button>
                  </Box>
                </Modal>
                <FieldArray
                  name="exercises"
                  render={(arrayHelpers) => (
                    <div>
                      {formik?.values?.exercises?.map(
                        (exercise, exerciseIndex) => (
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
                                                style={{
                                                  minWidth: 30,
                                                  maxWidth: 30,
                                                }}
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
                                                  onClick={(event) => {
                                                    if (event.target.checked) {
                                                      handleTimerOpen();
                                                    }
                                                  }}
                                                />
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  p: 0,
                                                  m: 0,
                                                  maxWidth: 30,
                                                }}
                                              >
                                                <Button
                                                  type="button"
                                                  onClick={function () {
                                                    arrayHelpers.remove(
                                                      setIndex
                                                    );
                                                    setSnackbarMsg(
                                                      "Set removed"
                                                    );
                                                  }}
                                                  // remove a set from the list
                                                  sx={{
                                                    p: 0,
                                                    m: 0,
                                                    maxWidth: 30,
                                                  }}
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
                                        <TableCell colspan="5">
                                          <Button
                                            type="button"
                                            onClick={function () {
                                              arrayHelpers.push({
                                                reps: "",
                                                weight: "",
                                              });
                                              setSnackbarMsg("Set added");
                                            }}
                                          >
                                            Add Set
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  )}
                                />

                                <TableCell colspan="5">
                                  <Button
                                    type="button"
                                    onClick={function () {
                                      arrayHelpers.remove(exerciseIndex);
                                      setSnackbarMsg(
                                        "Exercise removed from workout"
                                      );
                                    }} // remove an exercise from the list
                                    sx={{ color: "red" }}
                                  >
                                    Delete Exercise
                                  </Button>
                                </TableCell>
                              </Table>
                            </label>
                            <br />
                          </>
                        )
                      )}
                    </div>
                  )}
                />

                <Button onClick={handleOpen}>Add Exercise</Button>
                <AddExerciseModal
                  open={open}
                  handleClose={handleClose}
                  handleCardClick={handleCardClick}
                />
                <br />
                <br />

                <Button variant="contained" size="large" type="submit">
                  Finish Workout
                </Button>
                <p>{msg}</p>

                {/* <div>
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
                </div> */}
              </form>
            </fieldset>
            <Snackbar
              open={Boolean(snackbarMsg)}
              autoHideDuration={1200}
              message={snackbarMsg}
              onClose={() => setSnackbarMsg("")}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            />
          </Box>
        </Container>
      </FormikProvider>
    </>
  );
}

export default WorkoutSession;
