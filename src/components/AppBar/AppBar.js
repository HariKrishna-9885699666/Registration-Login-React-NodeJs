import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useStyles from "../../constants/useStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { logout, getCurrentUserData } from "../../actions/login";
import _ from "lodash";

function AppTopBar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [name, setName] = useState(null);
  let loggedInUserName;

  useEffect(() => {
    const timeout = setTimeout(() => {
      loggedInUserName = JSON.parse(props.getCurrentUserData)?.name;
      setName(loggedInUserName);
    }, 100);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("name", name);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Welcome {name}
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            handleClickOpen();
          }}
        >
          Logout
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Are you sure want to logout?"}
          </DialogTitle>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={props.logout} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    logout,
    getCurrentUserData,
  };
};

const mapDispatchToProps = {
  logout,
  getCurrentUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTopBar);
