import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Skeleton,
} from "@mui/material";
import clockSvg from "../assets/clock.svg";
import weightSvg from "../assets/weight.svg";
import { UserContext } from "../context/context";
import { DateTime, Interval } from "luxon";

const History = () => {
  const [user, setUser] = useContext(UserContext);

  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  // Authentication
  const userId = user.user.id;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    authorization: "Bearer " + token,
  };

  // Fetch User workouts
  useEffect(() => {
    fetch(`/api/workouts?userId=${userId}`, { headers: headers })
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        setIsLoading(false);
        console.log("User routines", data);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch your workouts");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("Workouts", workouts);
  }, [workouts]);

  const calculateWorkoutDuration = (workoutStart, workoutEnd) => {
    var start = DateTime.fromISO(workoutStart);
    var end = DateTime.fromISO(workoutEnd);
    var interval = Interval.fromDateTimes(start, end);
    var duration = interval.toDuration();
    return duration;
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      setIsLoading(true);
      setIsDeleting(true);
      console.log("userId", userId);
      fetch(`/api/workouts/${id}`, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({ userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setIsDeleting(false);
          console.log(data);
          setWorkouts(workouts.filter((workout) => workout._id !== id));
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMessage("Error deleting workout");
          setIsLoading(false);
          setIsDeleting(false);
        });
    }
  };

  return (
    <>
      <Container maxWidth={false}>
        <Typography variant="h4">History</Typography>
      </Container>{" "}
      {isLoading ? (
        // Show a loading placeholder or message while the data is being fetched
        <Box>
          <Typography>Loading...</Typography>
          <CircularProgress />
          <Skeleton width={345} height={450} />
        </Box>
      ) : (
        <Container maxWidth={false}>
          <Typography variant="subtitle1">Past Workouts</Typography>
          {workouts.map((ele) => (
            <>
              <Card variant="outlined" key={ele._id} sx={{ maxWidth: 345 }}>
                <CardContent>
                  {/* <Link to={`/routine/${ele._id}`}> */}
                  <Typography variant="h5" component="div">
                    {ele.name}
                  </Typography>

                  <Typography>
                    {DateTime.fromISO(ele.workoutStart).toFormat("dd MMM yy")}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-evenly"
                  >
                    <Box display="flex" alignItems="center">
                      <img
                        src={clockSvg}
                        style={{ width: 20, marginLeft: "10px" }}
                      />
                      <Typography>
                        {calculateWorkoutDuration(
                          ele.workoutStart,
                          ele.workoutEnd
                        ).toFormat("hh:mm:ss")}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <img
                        src={weightSvg}
                        style={{ width: 20, marginLeft: "10px" }}
                      />
                      <Typography>
                        {ele.exercises
                          .map((exercise) =>
                            exercise.sets.reduce(
                              (total, set) => total + set.weight,
                              0
                            )
                          )
                          .reduce(
                            (total, exerciseWeight) => total + exerciseWeight,
                            0
                          )}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {ele.exercises.map((sub, subindex) => (
                      <Typography key={sub._id}>
                        {sub.sets.length} sets x {sub.name}
                      </Typography>
                    ))}
                  </Typography>
                  <Box
                    sx={{
                      display: "inline-flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    {isDeleting ? (
                      <Typography>Deleting...</Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(ele._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
              <br />
            </>
          ))}
          {errorMessage && <div className="error">{errorMessage}</div>}
        </Container>
      )}
    </>
  );
};

export default History;
