import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
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
      <div>
        <Typography variant="h1">Exercise</Typography>
        {/* <Typography variant="h2">{exercise.name}</Typography>
        <Typography variant="body1">{exercise.bodyPart}</Typography> */}
      </div>
      {isLoading ? (
        // Show a loading placeholder or message while the data is being fetched
        <div>Loading...</div>
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
    </>
  );
}

export default Exercise;
