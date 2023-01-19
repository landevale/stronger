import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Modal,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DataContext } from "../App";
import listOfEquipment from "../components/listOfEquipment";
import listOfBodyparts from "../components/listOfBodyparts";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [open, setOpen] = useState(false); // state to control the modal's visibility
  //   const [bodyParts, setBodyParts] = useState([]); // state to store selected body parts
  //   const [equipment, setEquipment] = useState([]); // state to store selected equipment
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  // function to handle the opening and closing of the modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // function to handle the selection of body parts
  const handleBodyPartsChange = (event) => {
    if (selectedBodyParts.includes(event.target.value)) {
      setSelectedBodyParts(
        selectedBodyParts.filter((bodyPart) => bodyPart !== event.target.value)
      );
    } else {
      setSelectedBodyParts([...selectedBodyParts, event.target.value]);
    }
  };

  // function to handle the selection of equipment
  const handleEquipmentChange = (event) => {
    if (selectedEquipment.includes(event.target.value)) {
      setSelectedEquipment(
        selectedEquipment.filter((equip) => equip !== event.target.value)
      );
    } else {
      setSelectedEquipment([...selectedEquipment, event.target.value]);
    }
  };

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

  // Filter exercises based on search term
  const filteredExercises = exercises.filter((exercise) => {
    return (
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedBodyParts.length ||
        selectedBodyParts.includes(exercise.bodyPart)) &&
      (!selectedEquipment.length ||
        selectedEquipment.includes(exercise.equipment))
    );
  });

  return (
    <>
      <div>
        <h1>Exercises</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search for an exercise"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Filter
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
          <h2>Filters</h2>
          <FormControl component="fieldset">
            <FormLabel component="legend">Body Parts</FormLabel>
            <FormGroup>
              {/* map through all possible body parts and create a checkbox for each */}
              {listOfBodyparts.map((bodyPart) => (
                <FormControlLabel
                  key={bodyPart}
                  control={
                    <Checkbox
                      checked={selectedBodyParts.includes(bodyPart)}
                      onChange={handleBodyPartsChange}
                      value={bodyPart}
                    />
                  }
                  label={bodyPart}
                />
              ))}
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Equipment</FormLabel>
            <FormGroup>
              {/* map through all possible equipment and create a checkbox for each */}
              {listOfEquipment.map((equip) => (
                <FormControlLabel
                  key={equip}
                  control={
                    <Checkbox
                      checked={selectedEquipment.includes(equip)}
                      onChange={handleEquipmentChange}
                      value={equip}
                    />
                  }
                  label={equip}
                />
              ))}
            </FormGroup>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Apply
          </Button>
        </Box>
      </Modal>
      {isLoading ? (
        // Show a loading placeholder or message while the data is being fetched
        <div>Loading...</div>
      ) : (
        <div>
          {filteredExercises.map((ele) => (
            /* {filteredExercises
            .filter((exercise) => {
              // filter exercises based on selected body parts
              if (bodyParts.length === 0) return true;
              return bodyParts.includes(exercise.bodyPart);
            })
            .filter((exercise) => {
              // filter exercises based on selected equipment
              if (equipment.length === 0) return true;
              return equipment.some((equip) =>
                exercise.equipment.includes(equip)
              );
            })
            .map((ele) => ( */
            <Card key={ele._id} sx={{ maxWidth: 345 }}>
              <Link to={`/exercise/${ele._id}`}>
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

                      <br />
                      {ele.equipment}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  );
}

export default Exercises;
