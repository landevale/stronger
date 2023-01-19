import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, Field, FieldArray } from "formik";
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
import { routineSchema } from "../schema/routineSchema";
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

function EditRoutine() {
  const { id } = useParams();
  const [routine, setRoutine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  //   const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [msg, setMsg] = useState("");

  // Modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    console.log("Formik values", formik.values);
  }, [formik.values]);

  // const handleCardClick = (exercise) => {
  //   formik.setValues({
  //     ...formik.values,
  //     exercises: [...formik.values.exercises, exercise],
  //   });
  // };
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
          <legend>Edit Routine</legend>
          <form onSubmit={formik.handleSubmit} style={{ maxWidth: 345 }}>
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
                                            {/* <closeSvg
                                              style={{
                                                width: 25,
                                                fill: "red",
                                                stroke: "red",
                                              }}
                                            /> */}
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
                              // onClick={() => handleDeleteExercise(exerciseIndex)}
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

            <Button type="submit">Edit Routine</Button>
            <p>{msg}</p>
          </form>
        </fieldset>
      </Box>
    </FormikProvider>
  );
}

export default EditRoutine;
