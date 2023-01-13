import React, { useContext, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { DataContext } from "../App";
// import UserInfo from "./UserInfo";

function Navbar() {
  return (
    <>
      <nav className="navbar" id="myNavbar">
        <h2>STRONGER - Navbar</h2>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/workout">Workout</NavLink>
        <NavLink to="/exercises">Exercises</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <br />
    </>
  );
}

export default Navbar;
