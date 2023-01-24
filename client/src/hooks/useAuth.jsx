import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  //   useEffect(() => {
  //     const theUser = localStorage.getItem("user");
  //     if (theUser && !theUser.includes("undefined")) {
  //       setUser(JSON.parse(theUser));
  //     }
  //   }, []);

  // Listens for updates in the user key in local storage & update user state accordingly
  // useEffect(() => {
  //   window.addEventListener("storage", (e) => {
  //     if (e.key === "user") {
  //       setUser(JSON.parse(e.newValue));
  //     }
  //   });
  // }, []);

  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e.key === "user") {
        setUser(JSON.parse(e.newValue));
      }
    });
  });

  // Runs every time user state changes and check if user is logged in based on user state
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [user]);

  return { user, setUser, isLoggedIn, setIsLoggedIn };
};
