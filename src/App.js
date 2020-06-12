import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import moment from "moment";
import "./App.css";
import LogIn from "./components/Login/LogIn";
import DashBoard from "./components/DashBoard/DashBoard";
import Register from "./components/Register/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import { getCurrentUserToken, setUserLoggedIn } from "./actions/login";
// import Page404 from "./components/Page404/Page404";
// import AboutApp from "./components/AboutApp/AboutApp";

function App(props) {
  const [dateTime, setDateTime] = useState("");
  useEffect(() => {
    setDateTime(moment().format("MMMM Do YYYY"));
  }, []);

  useEffect(() => {
    if (props.getCurrentUserToken) {
      props.setUserLoggedIn(true);
    }
  }, [props.getCurrentUserToken]);
  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <LogIn dateTime={dateTime} />}
          />
          <Route
            path="/register"
            exact
            render={(props) => <Register dateTime={dateTime} />}
          />
          <ProtectedRoute
            exact
            path="/dashboard"
            component={DashBoard}
            isUserLoggedIn={props.isUserLoggedIn}
          />
          {/* <Route path="*" component={Page404} /> */}
        </Switch>
      </Router>
      {/* <AboutApp /> */}
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isUserLoggedIn: state.login.isUserLoggedIn,
    getCurrentUserToken,
    setUserLoggedIn,
  };
};

const mapDispatchToProps = {
  getCurrentUserToken,
  setUserLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
