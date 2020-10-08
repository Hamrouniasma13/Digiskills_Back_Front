import React, { Component } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Switch, Route } from "react-router-dom";
import Trainings from "../trainings/Trainings";

import ProfileActions from "./ProfileActions";
import SideBar from "../layout/roleSideBar";
import PrivateRoute from "../common/PrivateRoute";
import NotFound from "../not-found/NotFound";
import Addcourses from "../courses/Addcourse";
import Learners from "../learner/Learner";
import Managers from "../manager/ListManagers";
import AddTraining from "../trainings/AddTraining";
import NewTraining from "../trainings/newTraining";
import Courses from "../courses/Courses";
import AddModule from "../modules/AddModule";
import Register from "../auth/Register";
class Dashboard extends Component {
  // componentDidMount() {
  //   this.props.getCurrentProfile();
  // }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  gettrainingbyid(id) {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.jwtToken);
    myHeaders.append("Content-Type", "application/json");
    fetch(`/api/training//displayTraining/${id}`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          trainings: res,
          loadingtrainings: false,
        })
      );
  }
  render() {
    const { user } = this.props.auth;
    // const { profile, loading } = this.props.profile;

    let dashboardContent;
    const TrainingList = (id) => {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", localStorage.jwtToken);
      myHeaders.append("Content-Type", "application/json");
      fetch(`/api/training/displayTraining/${id}`, {
        method: "GET",
        headers: myHeaders,
      })
        .then((res) => res.json())
        .then(
          (res) =>
            this.setState({
              trainings: res,
              loadingtrainings: false,
            }),
          console.log("ok" + user._id)
        );
      return <div>{user.training}</div>;
    };

    // if (profile === null || loading) {
    //   dashboardContent = <Spinner />;
    // } else {
    //   //Check if logged in user has profile data
    //   if (Object.keys(profile).length > 0) {
    //     dashboardContent = (
    //       <div>
    //         <p className="lead text-muted">
    //           Welcome{" "}
    //           <Link to={`/profile/${profile.handle}`}>{user.firstName}</Link>
    //         </p>
    //         <ProfileActions />
    //         <div style={{ marginBottom: "60px" }} />
    //         {/* <button
    //           onClick={this.onDeleteClick.bind(this)}
    //           className="btn btn-danger"
    //         >
    //           Delete My Account
    //         </button> */}
    //       </div>
    //     );
    //   } else {
    //     //User is logged in but no profile
    //     dashboardContent = (
    //       <div>
    //         <p className="lead text-muted">Welcome {user.firstName}</p>
    //         <p>You have not yet setup a profile, please add some info</p>
    //         <Link to="/create-profile" className="btn btn-lg btn-info">
    //           Create Profile
    //         </Link>
    //       </div>
    //     );
    //   }
    // }

    const AdminRoutes = () => {
      const { path } = useRouteMatch();
      console.log("path    " + path);
      return (
        <Switch>
          <PrivateRoute exact path={`${path}`}>
            <p>admin</p>
          </PrivateRoute>
          <Route path={`${path}/trainings`} component={Trainings} />
          <Route path={`${path}/learners`} component={Learners} />
          <Route path={`${path}/managers`} component={Managers} />
          <Route path={`${path}/courses`} component={Courses} />
          <Route path={`${path}/addModule`} component={AddModule} />
          <Route path={`${path}/register`} component={Register} />
          <Route path={`${path}/addcourses`} component={Addcourses} />
          <Route path={`${path}/add-training`} component={AddTraining} />
        </Switch>
      );
    };

    const LearnerRoutes = () => {
      const { path } = useRouteMatch();
      console.log("path    " + path);
      return (
        <Switch>
          <PrivateRoute exact path={`${path}`}>
            <p>Learner</p>
            <TrainingList handler={user.training}></TrainingList>
          </PrivateRoute>
          <Route path={`${path}/trainings`} component={Trainings} />
        </Switch>
      );
    };

    const ManagerRoutes = () => {
      const { path } = useRouteMatch();
      console.log("path    " + path);
      return (
        <Switch>
          <PrivateRoute exact path={`${path}`}>
            <p>Manager</p>
          </PrivateRoute>
          <Route path={`${path}/trainings`} component={Trainings} />
          <Route path={`${path}/add-training`} component={AddTraining} />
          <Route path={`${path}/new-training`} component={NewTraining} />

          <Route path={`${path}/register`} component={Register} />
          <Route path={`${path}/courses`} component={Courses} />
        </Switch>
      );
    };

    const TrainerManagerRoutes = () => {
      return <p>TrainingManager</p>;
    };
    const RoleRoutes = () => {
      switch (user.role) {
        case "Learner":
          return <LearnerRoutes />;
          break;

        case "Manager":
          return <ManagerRoutes />;
          break;
        case "Admin":
          return <AdminRoutes />;
          break;

        case "Training manager":
          return <TrainerManagerRoutes />;

        default:
          return <p>No role</p>;
      }
    };
    return (
      <div className="dashboard">
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
  // getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  deleteAccount,
})(Dashboard);
