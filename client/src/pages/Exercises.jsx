import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { DataContext } from "../App";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  // fetch lists of all exercises
  useEffect(() => {
    fetch("/api/exercises/")
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
        // setRefresh(false); // Reset refresh to false
        // setIsLoading(false);
        console.log(data);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Exercises</h1>
      </div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100%"
            image="http://d205bpvrqc9yn1.cloudfront.net/0025.gif"
            alt="barbell bench press"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Barbell Bench Press
            </Typography>
            <Typography variant="body2" color="text.secondary">
              chest
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default Exercises;
