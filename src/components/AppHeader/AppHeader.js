import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useStyles from "../../constants/useStyles";

export default function AppHeader() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          React and Node Signup, Signin, Signout features
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
