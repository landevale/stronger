import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
  CardActionArea,
  Modal,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Skeleton,
} from "@mui/material";
// import { DataContext } from "../App";
import listOfEquipment from "../components/listOfEquipment";
import listOfBodyparts from "../components/listOfBodyparts";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [open, setOpen] = useState(false); // state to control the modal's visibility

  const [selectedBodyParts, setSelectedBodyParts] = useState([]); // state to store selected body parts
  const [selectedEquipment, setSelectedEquipment] = useState([]); // state to store selected equipment

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

  const handleSearchClear = () => {
    setSearchTerm("");
  };

  const handleReset = () => {
    setSelectedBodyParts([]);
    setSelectedEquipment([]);
    handleClose();
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

  // Filter exercises based on search term & selected body parts & selected equipment
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
        <Typography variant="h4">Exercises</Typography>
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Search for an exercise"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Button variant="contained" color="secondary" onClick={handleSearchClear}>
        Clear Search
      </Button>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Filter
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            maxHeight: 375,
            maxWidth: 375,
            overflow: "auto",
          }}
        >
          <Typography variant="h5">Filters</Typography>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Apply
          </Button>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Reset
          </Button>
          <br />
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
        </Box>
      </Modal>
      <br />
      <br />
      {isLoading ? (
        // Show a loading placeholder or message while the data is being fetched
        <Box>
          <Typography>Loading...</Typography>
          <Skeleton width={345} height={450} />
        </Box>
      ) : (
        <Box
          sx={{
            pt: 3, // padding top
            display: "flex",
            flexDirection: { sx: "column", md: "row" },
            justifyContent: "space-evenly",
            gap: 2,
            overflow: "auto",
            flexWrap: "wrap",
          }}
        >
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
            <LazyLoad key={ele.id}>
              <Card
                variant="outlined"
                sx={{ width: { xs: 1, md: 345 }, maxWidth: 345 }}
              >
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
            </LazyLoad>
          ))}
        </Box>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  );
}

export default Exercises;
