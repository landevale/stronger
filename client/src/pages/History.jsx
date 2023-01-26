import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CircularProgress,
  Grid,
  Modal,
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
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  // Authentication
  const userId = user.user.id;
  const token = localStorage.getItem("token");
  const headers = {
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

  return (
    <>
      <div>
        <Typography variant="h4">History</Typography>
      </div>{" "}
      {isLoading ? (
        // Show a loading placeholder or message while the data is being fetched
        <Box>
          <Typography>Loading...</Typography>
          <CircularProgress />
          <Skeleton width={345} height={450} />
        </Box>
      ) : (
        <div>
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
                      <p key={sub._id}>
                        {sub.sets.length} sets x {sub.name}
                      </p>
                    ))}
                  </Typography>
                </CardContent>
              </Card>
              <br />
            </>
          ))}
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  );
};

export default History;
