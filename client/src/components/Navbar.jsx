import React, { useContext, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
// import { DataContext } from "../App";
import { UserContext } from "../context/context";

function Navbar() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  console.log("Nav", user);

  const handleLogout = () => {
    setUser({ user: null, loading: false, error: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar" id="myNavbar">
        <h2>STRONGER - Navbar</h2>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/routines">Workout</NavLink>
        <NavLink to="/exercises">Exercises</NavLink>
        <NavLink to="/about">About</NavLink>
        {user.user && <NavLink onClick={handleLogout}>Logout</NavLink>}
      </nav>

      <br />
    </>
  );
}

export default Navbar;
