import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// import strongerLogo from "./assets/dumbbell.svg";
import "./App.css";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Workout from "./pages/Workout";
import EditRoutine from "./pages/EditRoutine";
import Exercises from "./pages/Exercises";
import Exercise from "./pages/Exercise";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Settings from "./pages/Settings";

export const DataContext = createContext();
console.log("DataContent", DataContext);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

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
              <Route path="/" element={<SharedLayout user={user} />}>
                <Route index element={<Home />} />
                <Route path="/workout" element={<Workout />} />
                <Route path="/routine/:id" element={<EditRoutine />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercise/:id" element={<Exercise />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Error />} />
              </Route>
              {/* Banner */}
              {/* <Route path="/" element={<LogLayout />}> */}
              {/* <Route path="/logout" element={<Logout setUser={setUser} />} /> */}
              {/* </Route> */}
              {/* No Navbar */}
              <Route path="/login" element={<Login />} />
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
