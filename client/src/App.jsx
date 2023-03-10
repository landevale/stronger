import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// import strongerLogo from "./assets/dumbbell.svg";
import "./App.css";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import History from "./pages/History";
import Routines from "./pages/Routines";
import AddRoutine from "./pages/AddRoutine";
import EditRoutine from "./pages/EditRoutine";
import WorkoutSession from "./pages/WorkoutSession";
import Exercises from "./pages/Exercises";
import Exercise from "./pages/Exercise";
import Error from "./pages/Error";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContext } from "./context/context";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        {/* <div className="App"> */}
        <GoogleOAuthProvider
          clientId={`${import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}`}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SharedLayout />}>
                {/* SHARED LAYOUT */}
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercise/:id" element={<Exercise />} />
                <Route
                  path="/signup"
                  element={
                    user?.user?.email ? <Navigate to="/home" /> : <Signup />
                  }
                />
                <Route
                  path="/login"
                  element={
                    user?.user?.email ? <Navigate to="/home" /> : <Login />
                  }
                />
                <Route path="*" element={<Error />} />
                {/* PROTECTED ROUTES */}
                <Route path="/history" element={<ProtectedRoute />}>
                  <Route path="/history" element={<History />} />
                </Route>
                <Route path="/routines" element={<ProtectedRoute />}>
                  <Route path="/routines" element={<Routines />} />
                </Route>
                <Route path="/routine/add" element={<ProtectedRoute />}>
                  <Route path="/routine/add" element={<AddRoutine />} />
                </Route>
                <Route path="/routine/:id" element={<ProtectedRoute />}>
                  <Route path="/routine/:id" element={<EditRoutine />} />
                </Route>
                <Route path="/workout/:id" element={<ProtectedRoute />}>
                  <Route path="/workout/:id" element={<WorkoutSession />} />
                </Route>

                <Route path="/settings" element={<ProtectedRoute />}>
                  <Route path="/settings" element={<Settings />} />
                </Route>
                {/* PROTECTED ROUTES END */}
                {/* SHARED LAYOUT END */}
              </Route>

              {/* No Navbar */}
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
        {/* </div> */}
      </Container>
    </>
  );
}

export default App;
