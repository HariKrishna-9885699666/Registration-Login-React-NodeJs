import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notification(props) {
  const classes = useStyles();
  const {
    open,
    setNotificationToast,
    successNotificationMessage,
    failureNotificationMessage,
  } = props;
  const [state] = React.useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;
  const severity =
    successNotificationMessage && !_.isEmpty(successNotificationMessage)
      ? "success"
      : "error";

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setNotificationToast(!open);
        }}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={() => {
            setNotificationToast(!open);
          }}
          severity={severity}
        >
          {severity === "success"
            ? successNotificationMessage
            : failureNotificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
