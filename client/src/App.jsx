import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// import strongerLogo from "./assets/dumbbell.svg";
import "./App.css";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Routines from "./pages/Routines";
import EditRoutine from "./pages/EditRoutine";
import Workout from "./pages/Workout";
import Exercises from "./pages/Exercises";
import Exercise from "./pages/Exercise";
import GoogleLoginPage from "./pages/GoogleLoginPage";
import GoogleLoginPage2 from "./pages/GoogleLoginPage2";
import Error from "./pages/Error";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export const DataContext = createContext();
console.log("DataContent", DataContext);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        {/* <div className="App"> */}
        <DataContext.Provider
          value={{
            user,
            setUser,
            isLoggedIn,
            setIsLoggedIn,
          }}
        >
          <BrowserRouter>
            <Routes>
              {/* <Route
                path="/"
                element={user?.email ? <Navigate to="/" /> : <Landing />}
              > */}
              <Route path="/" element={<SharedLayout user={user} />}>
                <Route index element={<Home user={user} />} />
                <Route path="/home" element={<Home user={user} />} />
                <Route path="/routines" element={<Routines />} />
                <Route path="/routine/:id" element={<EditRoutine />} />
                <Route path="/workout/:id" element={<Workout />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercise/:id" element={<Exercise />} />
                <Route path="/settings" element={<Settings />} />
                <Route
                  path="/signup"
                  element={user?.email ? <Navigate to="/home" /> : <Signup />}
                />
                <Route
                  path="/login"
                  element={user?.email ? <Navigate to="/home" /> : <Login />}
                />
                <Route path="*" element={<Error />} />
              </Route>
              {/* Banner */}
              {/* <Route path="/" element={<LogLayout />}> */}
              {/* <Route path="/logout" element={<Logout setUser={setUser} />} /> */}
              {/* </Route> */}
              {/* No Navbar */}
              <Route path="/googlelogin" element={<GoogleLoginPage />} />
              {/* <Route path="/display/:id" element={<DisplayClassroom />} /> */}
            </Routes>
          </BrowserRouter>
        </DataContext.Provider>
        {/* </div> */}
      </Container>
    </>
  );
}

export default App;
