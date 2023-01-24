import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/context";

export const ProtectedRoute = () => {
  const [user] = useContext(UserContext);

  if (user.loading) return <div className="loader"></div>;

  return user.user ? <Outlet /> : <Navigate to="/" />;
};
