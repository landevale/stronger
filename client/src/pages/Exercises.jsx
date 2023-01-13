import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { DataContext } from "../App";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  // fetch lists of all exercises
  useEffect(() => {
    fetch("/api/exercises/")
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
        // setRefresh(false); // Reset refresh to false
        setIsLoading(false);
        console.log(data);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch exercises");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Exercises</h1>
      </div>
      {isLoading ? (
        // Show a loading placeholder or message while the data is being fetched
        <div>Loading...</div>
      ) : (
        <div>
          {exercises.map((ele) => (
            <Card key={ele._id} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100%"
                  image={ele.gifUrl}
                  alt={ele.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ele.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ele.bodyPart}
                    {ele.equipment}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  );
}

export default Exercises;
