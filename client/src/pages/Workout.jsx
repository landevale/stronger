import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Modal,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { DataContext } from "../App";
import CountdownTimer from "../components/CountdownTimer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Workout() {
  // Modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //

  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  // fetch lists of all routines
  useEffect(() => {
    fetch("/api/routines/")
      .then((response) => response.json())
      .then((data) => {
        setRoutines(data);
        // setRefresh(false); // Reset refresh to false
        setIsLoading(false);
        console.log(data);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch routines");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Workout</h1>
      </div>
      {isLoading ? (
        // Show a loading placeholder or message while the data is being fetched
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Routines</h2>
          {routines.map((ele) => (
            <>
              <Card key={ele._id} sx={{ maxWidth: 345 }}>
                <Link to={`/routine/${ele._id}`}>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {ele.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ele.exercises.map((sub, subindex) => (
                          <p key={subindex}>
                            {sub.sets.length} sets x {sub.name}
                          </p>
                        ))}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
              <br />
            </>
          ))}
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}

      <Button onClick={handleOpen}>Open Countdown Timer</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Countdown Timer
          </Typography>
          <CountdownTimer />
          <Button onClick={handleClose}>SKIP</Button>
        </Box>
      </Modal>
    </>
  );
}

export default Workout;
