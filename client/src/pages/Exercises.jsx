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
      <div>
        {exercises.map((ele, i) => (
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
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Exercises;
