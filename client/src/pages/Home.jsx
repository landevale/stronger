import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { UserContext } from "../context/context";
// import { DataContext } from "../App";
import HistoryChart from "../components/HistoryChart";
import backgroundImage from "../assets/background.jpg";

function Home() {
  // const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(DataContext);
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  // console.log("User state", user);

  return user.user ? (
    <Container maxWidth={false}>
      <div style={{ align: "center" }}>
        <Typography variant="h3">Profile</Typography>
        <Avatar alt={user?.user.firstName} src={user?.user.picture} />
        <Typography variant="h5">{user?.user.firstName}</Typography>
        <HistoryChart />
        <div>
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </Container>
  ) : (
    <Box
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        // textAlign: "center",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // flexDirection: "column",
        // margin: "3rem",
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
        <Typography variant="h4" sx={{ color: "#ddd" }}>
          Track your progress, reach your goals with Stronger - the ultimate
          workout companion.
        </Typography>
        <Typography sx={{ color: "#ddd" }}>
          Try it out today! Sign up for free and start tracking your workouts.
        </Typography>

        <div>
          {/* <Link to="/login"> */}
          <Button variant="contained" href="/login">
            Login
          </Button>
          {/* </Link> */}
          {"   "}
          {/* <Link to="/signup"> */}
          <Button variant="contained" href="/signup">
            Sign Up
          </Button>
          {/* </Link> */}
        </div>
      </Box>
    </Box>
  );
}

export default Home;
