import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      loadingprofile: true,
    };
  }
  componentDidMount() {
    // if(this.props.match.params.handle) {
    //     this.props.getProfileByHandle(this.props.match.params.handle)
    // }

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
        })
      );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    // const { profile, loading } = this.props.profile;
    let profileContent;

    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6"></div>
        </div>
        <ProfileHeader profile={this.state.profile} />
      </div>
    );

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  //   profile: PropTypes.object.isRequired,
  //   getProfileByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  //   profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
