import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, FieldArray } from "formik";
import {
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { routineSchema } from "../schema/routineSchema";
import closeSvg from "../assets/close.svg";
import AddExerciseModal from "../components/AddExerciseModal";
import { UserContext } from "../context/context";

function EditRoutine() {
  const [user, setUser] = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  //   const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [msg, setMsg] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");

  // Modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: "",
    userId: "",
    exercises: [{ name: "", sets: [{ reps: "", weight: "" }] }],
  };

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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        console.log(data);
        navigate("/routines");
      } catch (error) {
        console.log(values);
        setMsg("Something went wrong!");
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
      setSnackbarMsg("Exercise added to routine"); // Set snackbar message
    }
  };

  return (
    <FormikProvider value={formik}>
      <Container maxWidth={false}>
        <Box sx={{ maxWidth: 345 }}>
          <fieldset style={{ maxWidth: 345 }}>
            <legend>Edit Routine</legend>
            <form onSubmit={formik.handleSubmit} style={{ maxWidth: 345 }}>
              <label>
                Routine:{" "}
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
                {formik.errors.name &&
                  formik.touched.name &&
                  formik.errors.name}
              </p>
              <FieldArray
                name="exercises"
                render={(arrayHelpers) => (
                  <div>
                    {formik?.values?.exercises?.map(
                      (exercise, exerciseIndex) => (
                        // {formState?.exercises?.map((exercise) => (
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
                                            <TableCell
                                              sx={{ p: 0, m: 0, maxWidth: 30 }}
                                            >
                                              <Button
                                                type="button"
                                                onClick={function () {
                                                  arrayHelpers.remove(setIndex);
                                                  setSnackbarMsg("Set removed");
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
                                      <TableCell colspan="4">
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

                              <TableCell colspan="4">
                                <Button
                                  type="button"
                                  onClick={function () {
                                    arrayHelpers.remove(exerciseIndex);
                                    setSnackbarMsg(
                                      "Exercise removed from routine"
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
                Edit Routine
              </Button>
              <p>{msg}</p>
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
  );
}

export default EditRoutine;
