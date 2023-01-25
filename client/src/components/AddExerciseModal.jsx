import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";
import {
  Box,
  Button,
  Typography,
  Modal,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";

import { UserContext } from "../context/context";

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

function AddExerciseModal({ open, handleClose, handleCardClick }) {
  const [exercises, setExercises] = useState([]);
  const [isExercisesLoading, setIsExercisesLoading] = useState(true);
  const [exercisesErrorMessage, setExercisesErrorMessage] = useState(""); // State to display error message
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

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

  // Filter exercises based on search term
  const filteredExercises = exercises.filter((exercise) => {
    return exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
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
          <input
            type="text"
            placeholder="Search for an exercise"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredExercises.map((ele) => (
            <LazyLoad key={ele.id}>
              <Card>
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
            </LazyLoad>
          ))}
          <Button onClick={handleClose}>CLOSE</Button>
        </Box>
      </Modal>
    </>
  );
}

export default AddExerciseModal;
