import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";

// import { DataContext } from "../App";

function Exercise() {
  const { id } = useParams();
  const [exercise, setExercise] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  // fetch exercise
  useEffect(() => {
    fetch(`/api/exercises/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setExercise(data);
        // setRefresh(false); // Reset refresh to false
        setIsLoading(false);
        console.log(data);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch exercises");
        setIsLoading(false);
      });
  }, [id]);

  return (
    <>
      <Container maxWidth={false}>
        <div>
          <Typography variant="h4">Exercise</Typography>
          {/* <Typography variant="h2">{exercise.name}</Typography>
        <Typography variant="body1">{exercise.bodyPart}</Typography> */}
        </div>
        {isLoading ? (
          // Show a loading placeholder or message while the data is being fetched
          <Box>
            <Typography>Loading...</Typography>
            <CircularProgress />
            <Skeleton width={345} height={450} />
          </Box>
        ) : (
          <div>
            <Card key={exercise?._id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="100%"
                image={exercise?.gifUrl}
                alt={exercise?.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {exercise?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Body Part: {exercise?.bodyPart}
                  <br />
                  Target Muscles: {exercise?.target}
                  <br />
                  Equipment Required: {exercise?.equipment}
                </Typography>
              </CardContent>
            </Card>
          </div>
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </Container>
    </>
  );
}

export default Exercise;
