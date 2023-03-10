import React, { useContext, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { UserContext } from "../context/context";
import logoSvg from "../assets/dumbbell.svg";

function Navbar() {
  const [user, setUser] = useContext(UserContext);
  // const navigate = useNavigate();

  console.log(user);

  // const handleLogout = () => {
  //   setUser({ user: null, loading: false, error: null });
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   navigate("/");
  // };

  return (
    <>
      <nav className="navbar" id="myNavbar">
        <Grid container>
          <Grid item>
            <Typography variant="h3" sx={{ px: 1, color: "#fff" }}>
              STRONGER
            </Typography>
          </Grid>
          <Grid item>
            <img
              src={logoSvg}
              style={{
                width: 30,
              }}
            />
          </Grid>
        </Grid>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/routines">Workout</NavLink>
        <NavLink to="/exercises">Exercises</NavLink>
        {/* {user.user && <Link onClick={handleLogout}>Logout</Link>} */}
      </nav>

      <br />
    </>
  );
}

export default Navbar;
