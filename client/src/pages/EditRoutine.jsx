import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";
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
    exercises: [{ name: "", sets: "" }],
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

  useEffect(() => {
    console.log("Formstate", formState);
  }, [formState]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: routineSchema,
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

            {/* {formik?.values?.exercises?.map((ele) => ( */}
            {formState?.exercises?.map((ele) => (
              <>
                <label key={ele._id}>
                  <Link to={`/exercise/${ele._id}`}>
                    <Typography variant="h5" component="div">
                      {ele.name}
                    </Typography>
                  </Link>
                  <table border="1">
                    <tr>
                      <th>Set</th>
                      <th>KG/LBS</th>
                      <th>Reps</th>
                    </tr>
                    {ele?.sets?.map((sub, subindex) => (
                      <tr key={subindex}>
                        <td>{subindex + 1}</td>
                        <td>{sub.weight}</td>
                        <td>{sub.reps}</td>
                      </tr>
                    ))}
                    <Button>Add Set</Button>
                  </table>
                </label>
                <br />
              </>
            ))}
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
