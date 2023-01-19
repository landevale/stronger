import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

function Home({ user }) {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  console.log(user);

  return (
    <div style={{ textAlign: "center", margin: "3rem" }}>
      <h1>Usernameplaceholder {user?.email}</h1>

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
  );
}

// return (
//   <div style={{ textAlign: "center", margin: "3rem" }}>
//     <h1>Please login or sign up</h1>

//     <p>
//       You are viewing this page because you are logged in or you just signed
//       up
//     </p>

//     <div>
//       <Link to="/login">
//         <button
//           style={{
//             // color: "red",
//             border: "1px solid gray",
//             backgroundColor: "white",
//             padding: "0.5rem 1rem",
//             cursor: "pointer",
//           }}
//         >
//           Login
//         </button>
//       </Link>
//     </div>
//   </div>
// );

export default Home;
