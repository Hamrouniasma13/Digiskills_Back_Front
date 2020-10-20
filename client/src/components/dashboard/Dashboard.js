import React, { Component } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Switch, Route } from "react-router-dom";
import Trainings from "../trainings/Trainings";

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
import newCourse from "../courses/newCourse"

import PWD from "../auth/EditPassword";
import Profile from "../profile/Profile";
import { CropLandscapeOutlined } from "@material-ui/icons";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      loadingprofile: true,
    };
  }
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.jwtToken);
    myHeaders.append("Content-Type", "application/json");
    fetch("/api/user/me", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          loadingprofile: false,
          profile: result,
        }),

      );
    console.log("ok")
    console.log(this.state.profile.training)
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    console.log(this.state.profile)
    console.log(this.state.profile.training)
    let dashboardContent;


    const AdminRoutes = () => {
      const { path } = useRouteMatch();
      return (
        <Switch>
          <PrivateRoute exact path={`${path}`}>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">admin</h1>

              <a href="/dashboard/EditP" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-edit text-white-50"></i> Changer MDP</a>
            </div>
          </PrivateRoute>
          <Route path={`${path}/trainings`} component={Trainings} />
          <Route path={`${path}/new-training`} component={NewTraining} />
          <Route path={`${path}/learners`} component={Learners} />
          <Route path={`${path}/managers`} component={Managers} />
          <Route path={`${path}/courses`} component={Courses} />
          <Route path={`${path}/addModule`} component={AddModule} />
          <Route path={`${path}/register`} component={Register} />
          <Route path={`${path}/addcourses`} component={Addcourses} />
          <Route path={`${path}/newCourse`} component={newCourse} />
          <Route path={`${path}/add-training`} component={AddTraining} />
          <Route path={`${path}/me`} component={Profile} />
          <Route path={`${path}/EditP`} component={PWD} />
        </Switch>
      );
    };

    const LearnerRoutes = () => {
      const { path } = useRouteMatch();

      return (
        <Switch>
          <PrivateRoute exact path={`${path}`}>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">Learner</h1>

              <a href="/dashboard/EditP" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-edit text-white-50"></i> Changer MDP</a>
            </div>
          </PrivateRoute>
          <Route path={`${path}/trainings`} component={Trainings} />
          <Route path={`${path}/me`} component={Profile} />
          <Route path={`${path}/EditP`} component={PWD} />
        </Switch>
      );
    };

    const ManagerRoutes = () => {
      const { path } = useRouteMatch();
      return (
        <Switch>
          <PrivateRoute exact path={`${path}`}>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">Manager</h1>

              <a href="/dashboard/EditP" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-edit text-white-50"></i> Changer MDP</a>
            </div>
          </PrivateRoute>
          <Route path={`${path}/trainings`} component={Trainings} />
          <Route path={`${path}/add-training`} component={AddTraining} />
          <Route path={`${path}/new-training`} component={NewTraining} />
          <Route path={`${path}/me`} component={Profile} />
          <Route path={`${path}/register`} component={Register} />
          <Route path={`${path}/courses`} component={Courses} />
          <Route path={`${path}/EditP`} component={PWD} />
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

                {/* {
              this.state.profile.training != null ? (
              
                
                <div>
              {this.state.profile.training.map((tr) => (
              
                        <>
                          {tr._id}
                          <br /> */}
                {/* {tr.speciality}
                          <br />
                          {/* <Moment format="YYYY/MM/DD">
                            {tr.startDate}
                          </Moment>-{" "}
                          <Moment format="YYYY/MM/DD">{tr.endDate}</Moment> */}
                {/* </>
                      ))
                      }
                      </div>
                  ): (
                      ""
                    )
                    }  */}
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
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  deleteAccount,
})(Dashboard);
