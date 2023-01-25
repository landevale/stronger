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
// import CountdownTimer from "../components/CountdownTimer";
import statusSvg from "../assets/status-preparing-borderless.svg";
import plusSvg from "../assets/plus.svg";
import editSvg from "../assets/edit.svg";
import { UserContext } from "../context/context";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

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
  const [sampleRoutines, setSampleRoutines] = useState([]);
  const [isLoadingSample, setIsLoadingSample] = useState(true);
  const [errorMessageSample, setErrorMessageSample] = useState("");

  // Authentication
  const userId = user.user.id;
  const token = localStorage.getItem("token");
  const headers = {
    authorization: "Bearer " + token,
  };

  // Fetch User routines
  useEffect(() => {
    fetch(`/api/routines?userId=${userId}`, { headers: headers })
      .then((response) => response.json())
      .then((data) => {
        setRoutines(data);
        setIsLoading(false);
        console.log("User routines", data);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch your routines");
        setIsLoading(false);
      });
  }, []);

  // Fetch sample routines
  useEffect(() => {
    fetch("/api/routines/sample/?sample=true", { headers: headers })
      .then((response) => response.json())
      .then((data) => {
        setSampleRoutines(data);
        setIsLoadingSample(false);
        console.log("Sample routines", data);
      })
      .catch(() => {
        setErrorMessageSample("Unable to fetch sample routines");
        setIsLoadingSample(false);
      });
  }, []);

  return (
    <>
      <div>
        <Typography variant="h4">Workout</Typography>
      </div>
      {isLoading ? (
        // Show a loading placeholder or message while the data is being fetched
        <div>Loading...</div>
      ) : (
        <div>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Routines</Typography>
            <Link to={`/routine/add`}>
              <img
                src={plusSvg}
                style={{
                  width: 25,
                }}
              />
            </Link>
          </Box>
          <div>
            <Typography variant="subtitle1">My Templates</Typography>
            {routines.map((ele) => (
              <>
                <Card key={ele._id} sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Link to={`/routine/${ele._id}`}>
                      <Typography variant="h5" component="div">
                        {ele.name}
                      </Typography>
                      <img
                        src={editSvg}
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
          <div>
            <Typography variant="subtitle1">Sample Templates</Typography>
            {sampleRoutines.map((ele) => (
              <>
                <Card key={ele._id} sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {ele.name}
                    </Typography>

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
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
      {errorMessageSample && <div className="error">{errorMessageSample}</div>}
      {/* <Button onClick={handleOpen}>Open Countdown Timer</Button>
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
      </Modal> */}
    </>
  );
}

export default Routines;
