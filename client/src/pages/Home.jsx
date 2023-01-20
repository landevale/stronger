import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataContext } from "../App";

function Home() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(DataContext);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  console.log("User state", user);

  return isLoggedIn ? (
    <div style={{ textAlign: "center", margin: "3rem" }}>
      <h1>Hi {user?.email}</h1>

      <p>
        You are viewing this page because you are logged in or you just signed
        up
      </p>

      <div>
        <button
          onClick={logout}
          style={{
            color: "red",
            border: "1px solid gray",
            backgroundColor: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", margin: "3rem" }}>
      <h1>Please login or sign up</h1>

      <p>
        You are viewing this page because you are logged out or you not signed
        up
      </p>

      <div>
        <Link to="/login">
          <Button
          // style={{
          //   border: "1px solid gray",
          //   backgroundColor: "white",
          //   padding: "0.5rem 1rem",
          //   cursor: "pointer",
          // }}
          >
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button
          // style={{
          //   border: "1px solid gray",
          //   backgroundColor: "white",
          //   padding: "0.5rem 1rem",
          //   cursor: "pointer",
          // }}
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
