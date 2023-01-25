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
// import { DataContext } from "../App";
import CountdownTimer from "../components/CountdownTimer";
import statusSvg from "../assets/status-preparing-borderless.svg";
import plusSvg from "../assets/plus.svg";
import { UserContext } from "../context/context";

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

function Routines() {
  const [user, setUser] = useContext(UserContext);

  // Modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //

  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  const userId = user.user.id;

  // fetch lists of User routines
  useEffect(() => {
    // fetch("/api/routines/")
    fetch(`/api/routines?userId=${userId}`)
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
          <Link to={`/routine/add`}>
            <img
              src={plusSvg}
              style={{
                width: 20,
              }}
            />
          </Link>
          {routines.map((ele) => (
            <>
              <Card key={ele._id} sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Link to={`/routine/${ele._id}`}>
                    <Typography variant="h5" component="div">
                      {ele.name}
                    </Typography>
                    <img
                      src={statusSvg}
                      style={{
                        width: 20,
                      }}
                    />
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {ele.exercises.map((sub, subindex) => (
                      <p key={sub._id}>
                        {sub.sets.length} sets x {sub.name}
                      </p>
                    ))}
                  </Typography>
                  <Link to={`/workout/${ele._id}`}>
                    <Button>Start Workout</Button>
                  </Link>
                </CardContent>
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

export default Routines;
