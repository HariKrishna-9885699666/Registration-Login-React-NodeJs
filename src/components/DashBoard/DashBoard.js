import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppTopBar from "../AppBar/AppBar";

export default function DashBoard(props) {
  return (
    <>
      <AppTopBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="92vh"
      >
        <Container component="main">
          <CssBaseline />
          <Typography variant="h4" gutterBottom align="center">
            Welcome to DashBoard
          </Typography>
        </Container>
      </Box>
    </>
  );
}
