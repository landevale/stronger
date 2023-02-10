// Login.jsx
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";
// import { DataContext } from "../App";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const Login = () => {
  // const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(DataContext);
  const { handleGoogle, loading, error } = useFetch(
    // "http://localhost:3000/auth/login"
    "/auth/login"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  // console.log("User", user);
  console.log("LS", localStorage.user);

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          // height: "30vh"
        }}
      >
        <Typography variant="h4" sx={{ mt: 30, mb: 5 }}>
          Login to continue
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </Box>
      <footer></footer>
    </>
  );
};

export default Login;
