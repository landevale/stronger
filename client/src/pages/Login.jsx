// Login.jsx
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { DataContext } from "../App";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const Login = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(DataContext);
  const { handleGoogle, loading, error } = useFetch("/api/login");

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

  console.log("User", user);
  console.log("LS", localStorage.user);

  return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Login to continue</h1>
      </header>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
      <footer></footer>
    </>
  );
};

export default Login;
