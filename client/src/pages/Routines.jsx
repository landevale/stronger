import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Modal,
  Card,
  CardContent,
  CardActionArea,
  Skeleton,
} from "@mui/material";
import statusSvg from "../assets/status-preparing-borderless.svg";
import plusSvg from "../assets/plus.svg";
import editSvg from "../assets/edit.svg";
import { UserContext } from "../context/context";

function Routines() {
  const [user, setUser] = useContext(UserContext);

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
        <Box>
          <Typography>Loading...</Typography>
          <CircularProgress />
          <Skeleton width={345} height={450} />
        </Box>
      ) : (
        <div>
          <Box
            display="inline-flex"
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
                <Card variant="outlined" key={ele._id} sx={{ maxWidth: 345 }}>
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
                <Card variant="outlined" key={ele._id} sx={{ maxWidth: 345 }}>
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
    </>
  );
}

export default Routines;
