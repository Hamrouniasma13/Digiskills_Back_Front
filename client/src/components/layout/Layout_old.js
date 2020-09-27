import React, { Component, Suspense } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearCurrentProfile } from "../../actions/profileActions";

import { Router, Route, Switch, Redirect } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../../actions/authActions";

import { Provider } from "react-redux";
import "../../assets/vendor/fontawesome-free/css/all.min.css";
import "../../assets/css/sb-admin-2.min.css";

import Landing from "../layout/Landing";
// import Login from "../auth/Login";
import Tab from "../auth/Tab";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../create-profile/CreateProfile";
import EditProfile from "../edit-profile/EditProfile";
import Profiles from "../profiles/Profiles";
import Trainings from "../trainings/Trainings";
import Profile from "../profile/Profile";
import NotFound from "../not-found/NotFound";
import Addcourses from "../courses/Addcourse";
import AddTraining from "../trainings/AddTraining";
import Courses from "../courses/Courses";
import AddModule from "../modules/AddModule";
import DashboardManager from "../dashboard/DashboardManager";

import store from "../../store";

import PrivateRoute from "../common/PrivateRoute";
import "../../assets/appStyles.css";

// Check for token
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

export class Layout extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <div>
        <div id="wrapper">
          <SideBar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              {/* <Dashboard /> */}
              <div className="container">
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/trainings" component={Trainings} />
                <Route exact path="/courses" component={Courses} />
                <Route exact path="/addModule" component={AddModule} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/dashboardManager"
                    component={DashboardManager}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/addcourses"
                    component={Addcourses}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute path="/add-training" component={AddTraining} />
                </Switch>

                <Route exact path="/not-found" component={NotFound} />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
    const guestLinks = (
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <Route exact path="/login" component={Tab} />
        </div>
      </div>
    );
    return (
      <div>
        <div id="wrapper">
          <div id="content-wrapper" class="d-flex flex-column">
            <Route exact path="/" component={Landing} />

            <div id="content">
              <Switch>
                <Route exact path="/login" component={Tab} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/add-training" component={AddTraining} />
                <PrivateRoute exact path="/trainings" component={Trainings} />
                <PrivateRoute exact path="/courses" component={Courses} />
                <PrivateRoute exact path="/addModule" component={AddModule} />
                <PrivateRoute exact path="/register" component={Register} />
                <PrivateRoute exact path="/addcourses" component={Addcourses} />
                <PrivateRoute path="/add-training" component={AddTraining} />
                <Route exact path="/not-found" component={NotFound} />

                <Route exact path="*">
                  <p>404</p>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Layout.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { clearCurrentProfile })(Layout);
