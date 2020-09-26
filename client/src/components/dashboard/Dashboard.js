import React, { Component } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import { Switch, Route } from "react-router-dom";

import ProfileActions from "./ProfileActions";
import SideBar from '../layout/roleSideBar'
import DashboardManager from "../dashboard/DashboardManager";
import PrivateRoute from "../common/PrivateRoute";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;

    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}>{user.firstName}</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }} />
            {/* <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button> */}
          </div>
        );
      } else {
        //User is logged in but no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.firstName}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    const AdminRoutes = () => {
      const { path } = useRouteMatch();
      console.log("path    " + path)
      return (
        <Switch>
          <PrivateRoute exact path={`${path}`}>
            <p>admin</p>
          </PrivateRoute>
          <PrivateRoute path={`${path}/second`}>
            <p>Second Page</p>
          </PrivateRoute>
        </Switch>
      )
    }

    const LearnerRoutes = () => {
      const { path } = useRouteMatch();
      console.log("path    " + path)
      return (
        <Switch>
          <PrivateRoute exact path={`${path}`}>
            <p>admin</p>
          </PrivateRoute>
          <PrivateRoute path={`${path}/second`}>
            <p>Second Page</p>
          </PrivateRoute>
        </Switch>
      )
    }




    const ManagerRoutes = () => {
      return <p>Manager</p>
    }

    const TrainerManagerRoutes = () => {
      return <p>TrainingManager</p>
    }
    const RoleRoutes = () => {

      switch (user.role) {
        case ("Learner"):
          return <LearnerRoutes />
          break;

        case ("Manager"):
          return <ManagerRoutes />
          break;
        case ("Admin"):
          return <AdminRoutes />
          break;

        case ("Training manager"):
          return <TrainerManagerRoutes />

        default: return <p>No role</p>
      }
    }
    return (
      <div className="dashboard" >
        <div id="wrapper">
          <SideBar userRole={user.role} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              {/* <Dashboard /> */}
              <div className="container">
                <RoleRoutes />
              </div>
              <Footer />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
