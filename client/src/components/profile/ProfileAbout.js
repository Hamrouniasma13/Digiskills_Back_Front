import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // //Get first name
    // const firstName = profile.user.name.trim().split('')[0];

    //Background List
    const background = profile.background.map((backgrounds, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check"></i>
        {backgrounds}
      </div>
    ));
    return (
      <div className="row">
        <div className="card card-body b-light mb-3">
          <h3 className="text-center text-info">Background Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {background}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
