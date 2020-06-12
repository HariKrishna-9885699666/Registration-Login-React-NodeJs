import React, { useEffect, useCallback, useMemo } from "react";
import useAsync from "react-use-async-hook";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import validationMessages from "../../constants/validation-messages";
import { nameRegex } from "../../constants/regex";
import FooterDate from "../FooterDate/FooterDate";
import useStyles from "../../constants/useStyles";
import AppHeader from "../AppHeader/AppHeader";
import * as handlers from "../../utils/handlers";
import { registerAPI } from "../../api/register";
import Notification from "../Notification/Notification";

export default function Register(props) {
  const { dateTime } = props;
  const classes = useStyles();
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

  const { login, register } = validationMessages;

  // User Registration
  const {
    data: registerAPIResponse,
    loading: registerLoading,
    execute: registerAPIExec,
  } = useAsync({
    autoExecute: false,
    initialData: useMemo(() => [], []),
    task: useCallback(async (values, actions) => {
      const reqbody = { ...values };
      delete reqbody.cpassword;
      return {
        response: await registerAPI(reqbody),
        actions,
      };
    }, []),
    dataLoader: useCallback(({ response, actions }) => {
      if (response.data.success) {
        actions.resetForm();
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

  const showRegisterLoadingLoading = useMemo(() => registerLoading, [
    registerLoading,
  ]);
  handleLoader(showRegisterLoadingLoading);

  useEffect(() => {
    if (registerAPIResponse.success) {
      setNotificationToast(true);
      setSuccessNotificationMessage("Registration successful");
    }
  }, [
    registerAPIResponse,
    setNotificationToast,
    setSuccessNotificationMessage,
  ]);

  return (
    <div>
      <AppHeader />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              cpassword: "",
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .required(register.firstName.REQUIRED)
                .min(2, register.firstName.CHAR_LENGTH)
                .matches(nameRegex, {
                  message: register.firstName.ONLY_ALPHABETS,
                  excludeEmptyString: true,
                }),
              lastName: Yup.string()
                .required(register.lastName.REQUIRED)
                .min(2, register.lastName.CHAR_LENGTH)
                .matches(nameRegex, {
                  message: register.lastName.ONLY_ALPHABETS,
                  excludeEmptyString: true,
                }),
              email: Yup.string()
                .email(login.email.EMAIL_INVALID)
                .required(login.email.REQUIRED),
              password: Yup.string()
                .min(6, login.password.MIN_CHAR_LENGTH)
                .max(8, login.password.MAX_CHAR_LENGTH)
                .required(login.password.REQUIRED),
              cpassword: Yup.string()
                .required(login.password.REQUIRED)
                .oneOf([Yup.ref("password"), null], login.cpassword.MATCH),
            })}
            onSubmit={(values, actions) => {
              registerAPIExec(values, actions);
              actions.setSubmitting(false);
            }}
          >
            {(props) => {
              return (
                <Form
                  className={classes.form}
                  noValidate
                  onSubmit={props.handleSubmit}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.firstName}
                        helperText={
                          props.errors.firstName &&
                          props.touched.firstName &&
                          props.errors.firstName
                        }
                        error={
                          props.errors.firstName && props.touched.firstName
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lastName}
                        helperText={
                          props.errors.lastName &&
                          props.touched.lastName &&
                          props.errors.lastName
                        }
                        error={props.errors.lastName && props.touched.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        helperText={
                          props.errors.email &&
                          props.touched.email &&
                          props.errors.email
                        }
                        error={props.errors.email && props.touched.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
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
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="cpassword"
                        autoComplete="current-password"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.cpassword}
                        helperText={
                          props.errors.cpassword &&
                          props.touched.cpassword &&
                          props.errors.cpassword
                        }
                        error={
                          props.errors.cpassword && props.touched.cpassword
                        }
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link to="/" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Box mt={5}>
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
    </div>
  );
}
