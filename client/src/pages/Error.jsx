import React, { useContext } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { UserContext } from "../context/context";
import oopsImage from "../assets/oops.jpg";

function Error() {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <Box
        style={{
          backgroundImage: `url(${oopsImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "100vh",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" sx={{ color: "#ddd", my: 1 }}>
            OOPS! Something went wrong.
          </Typography>
          {user.user ? (
            <>
              <Typography sx={{ color: "#ddd", my: 1 }}>
                Get back on track! Start your workout.
              </Typography>
              <Box sx={{ my: 1 }}>
                <Button variant="contained" href="/" sx={{ mx: 2 }}>
                  Let's Go!
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ color: "#ddd", my: 1 }}>
                {" "}
                Get back on track! Sign up for free and start tracking your
                workouts.
              </Typography>
              <Box sx={{ my: 1 }}>
                <Button variant="contained" href="/login" sx={{ mx: 2 }}>
                  Login
                </Button>
                <Button variant="contained" href="/signup" sx={{ mx: 2 }}>
                  Sign Up
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Error;
