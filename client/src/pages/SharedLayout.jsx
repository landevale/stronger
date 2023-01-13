import React from "react";
import { Outlet } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SharedLayout() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        <Navbar />
        <div>
          <Outlet />
        </div>
        <div>
          <br />
          <br />
        </div>
        {/* <Footer /> */}
      </Container>
    </>
  );
}

export default SharedLayout;
