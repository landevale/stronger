import React, { useState, createContext, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// import strongerLogo from "./assets/dumbbell.svg";
import "./App.css";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import History from "./pages/History";
import Landing from "./pages/Landing";
import Routines from "./pages/Routines";
import AddRoutine from "./pages/AddRoutine";
import EditRoutine from "./pages/EditRoutine";
import Workout from "./pages/Workout";
import Exercises from "./pages/Exercises";
import Exercise from "./pages/Exercise";
import GoogleLoginPage from "./pages/GoogleLoginPage";
import GoogleLoginPage2 from "./pages/GoogleLoginPage2";
import GoogleLoginPage3 from "./pages/GoogleLoginPage3";
import Error from "./pages/Error";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContext } from "./context/context";
import { ProtectedRoute } from "./routes/ProtectedRoute";

// import { useAuth } from "./hooks/useAuth";

// export const DataContext = createContext();
// console.log("DataContent", DataContext);

function App() {
  const [user, setUser] = useContext(UserContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   const theUser = localStorage.getItem("user");
  //   if (theUser && !theUser.includes("undefined")) {
  //     setUser(JSON.parse(theUser));
  //   }
  // }, []);
  // const auth = useAuth();
  // const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        {/* <div className="App"> */}
        <GoogleOAuthProvider
          clientId={`${import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}`}
        >
          {/* <DataContext.Provider
            value={{
              user,
              setUser,
              isLoggedIn,
              setIsLoggedIn,
            }}
          > */}
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
                  <Route path="/workout/:id" element={<Workout />} />
                </Route>

                <Route path="/settings" element={<ProtectedRoute />}>
                  <Route path="/settings" element={<Settings />} />
                </Route>
                {/* PROTECTED ROUTES END */}
                {/* SHARED LAYOUT END */}
              </Route>
              {/* Banner */}
              {/* <Route path="/" element={<LogLayout />}> */}
              {/* <Route path="/logout" element={<Logout setUser={setUser} />} /> */}
              {/* </Route> */}
              {/* No Navbar */}
              <Route path="/googlelogin" element={<GoogleLoginPage />} />
              <Route path="/googlelogin2" element={<GoogleLoginPage2 />} />
              <Route path="/googlelogin3" element={<GoogleLoginPage3 />} />
              {/* <Route path="/display/:id" element={<DisplayClassroom />} /> */}
            </Routes>
          </BrowserRouter>
          {/* </DataContext.Provider> */}
        </GoogleOAuthProvider>
        {/* </div> */}
      </Container>
    </>
  );
}

export default App;
