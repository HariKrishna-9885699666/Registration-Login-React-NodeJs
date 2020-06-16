import React, { useEffect, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import useAsync from "react-use-async-hook";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { Redirect, Link } from "react-router-dom";
import validationMessages from "../../constants/validation-messages";
import FooterDate from "../FooterDate/FooterDate";
import useStyles from "../../constants/useStyles";
import AppHeader from "../AppHeader/AppHeader";
import * as handlers from "../../utils/handlers";
import { loginAPI } from "../../api/login";
import Notification from "../Notification/Notification";
import * as types from "../../actions/actionTypes";
import { setUserLoggedIn } from "../../actions/login";

function LogIn(props) {
  const { dateTime, setUserLoggedIn, isUserLoggedIn } = props;
  const classes = useStyles();
  const { login } = validationMessages;

  const { loaderOpen, setLoaderOpen } = handlers.useLoader();
  const {
    notificationToast,
    setNotificationToast,
    successNotificationMessage,
    setSuccessNotificationMessage,
    failureNotificationMessage,
    setFailureNotificationMessage,
  } = handlers.useNotification();
  const handleLoader = (value) => {
    if (loaderOpen !== value) {
      setLoaderOpen(value);
    }
  };

  // User Login
  const {
    data: loginAPIResponse,
    loading: loginLoading,
    execute: loginAPIExec,
  } = useAsync({
    autoExecute: false,
    initialData: useMemo(() => [], []),
    task: useCallback(async (values, actions) => {
      const reqbody = { ...values };
      return {
        response: await loginAPI(reqbody),
        actions,
      };
    }, []),
    dataLoader: useCallback(({ response, actions }) => {
      if (_.get(response, "data.success")) {
        actions.resetForm();
        const respData = _.get(response, "data.data.data");
        delete respData.message;
        setUserLoggedIn(true, respData, _.get(response, "headers.authtoken"));
      }
      return response.data;
    }, []),
    onError: useCallback(
      (errorRes) => {
        setNotificationToast(true);
        setSuccessNotificationMessage(false);
        handlers.apiErrorHandler(errorRes, setFailureNotificationMessage);
      },
      [setFailureNotificationMessage, setNotificationToast]
    ),
  });

  const showLoginLoadingLoading = useMemo(() => loginLoading, [loginLoading]);
  handleLoader(showLoginLoadingLoading);

  return (
    <>
      <AppHeader />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "12345678",
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .email(login.email.EMAIL_INVALID)
                .required(login.email.REQUIRED),
              password: Yup.string().required(login.password.REQUIRED),
            })}
            onSubmit={(values, actions) => {
              loginAPIExec(values, actions);
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form
                className={classes.form}
                noValidate
                onSubmit={props.handleSubmit}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Email Address"
                  name="username"
                  autoComplete="username"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.username}
                  helperText={
                    props.errors.username &&
                    props.touched.username &&
                    props.errors.username
                  }
                  error={props.errors.username && props.touched.username}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  helperText={
                    props.errors.password &&
                    props.touched.password &&
                    props.errors.password
                  }
                  error={props.errors.password && props.touched.password}
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                  </Grid>
                  <Grid item>
                    <Link to={"/register"}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
        <Box mt={8}>
          <FooterDate dateTime={dateTime} />
        </Box>
        <Backdrop className={classes.backdrop} open={loaderOpen}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Notification
          open={notificationToast}
          setNotificationToast={setNotificationToast}
          successNotificationMessage={successNotificationMessage}
          failureNotificationMessage={failureNotificationMessage}
        />
      </Container>
      {isUserLoggedIn ? (
        <Redirect
          to={{
            pathname: "/dashboard",
          }}
        />
      ) : null}
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isUserLoggedIn: state.login.isUserLoggedIn,
  };
};

const mapDispatchToProps = { setUserLoggedIn };

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
