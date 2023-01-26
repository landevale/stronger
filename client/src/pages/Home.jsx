import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Typography } from "@mui/material";
import { UserContext } from "../context/context";
// import { DataContext } from "../App";

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
    <div style={{ align: "center", margin: "3rem" }}>
      <Typography variant="h3">Profile</Typography>
      <Avatar alt={user?.user.firstName} src={user?.user.picture} />
      <Typography variant="h5">{user?.user.firstName}</Typography>

      <div>
        <Button variant="contained" color="error" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", margin: "3rem" }}>
      <Typography variant="h4">Please login or sign up</Typography>
      <p>
        You are viewing this page because you are logged out or you not signed
        up
      </p>

      <div>
        <Link to="/login">
          <Button variant="outlined">Login</Button>
        </Link>
        {"   "}
        <Link to="/signup">
          <Button variant="outlined">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
