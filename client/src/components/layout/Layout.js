import React from "react";
import Tabs from "../auth/Tab";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "../auth/Login";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
import store from "../../store";
import { clearCurrentProfile } from "../../actions/profileActions";


if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthentcated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current Profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/login";
  }
}

const Layout = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/dashboard">
        <p>Dashboard</p>
      </Route>
      <Route path="/login">
        <Tabs />
      </Route>
    </Switch>
  );
};

export default Layout;
