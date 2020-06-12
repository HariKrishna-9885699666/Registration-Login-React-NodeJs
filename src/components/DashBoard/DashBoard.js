import React, { useEffect, useCallback, useMemo } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import useStyles from "../../constants/useStyles";
import AppTopBar from "../AppBar/AppBar";
const _ = require("lodash");

export default function DashBoard(props) {
  const classes = useStyles();
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
