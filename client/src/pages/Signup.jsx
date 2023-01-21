import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { DataContext } from "../App";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUp = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(DataContext);
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:3000/auth/signup"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  console.log("User", user);
  console.log("LS User", localStorage.user);

  return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Register to continue</h1>
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
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </main>
      <footer></footer>
    </>
  );
};

export default SignUp;
