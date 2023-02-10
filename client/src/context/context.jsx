import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext([
  { data: null, loading: true, error: null },
  () => {},
]);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: null,
    loading: true,
    error: null,
  });

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      // const response = await fetch("http://localhost:3000/auth/profile", {
      const response = await fetch("/auth/profile", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setUser({
          user: json.user,
          loading: false,
          error: null,
        });
      } else {
        setUser({
          user: null,
          loading: false,
          error: json.errors[0].msg,
        });
      }
    } catch (error) {
      setUser({
        user: null,
        loading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        user: null,
        loading: false,
        error: null,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
