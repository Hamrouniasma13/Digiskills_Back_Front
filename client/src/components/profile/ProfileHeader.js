import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import img from "../../assets/img/avatar.png";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light text-black mb-3">
            {/* <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={img} alt="" />
              </div>
            </div> */}
            <div className="text-center">
              <h1 className="displa-4 text-center">{profile.firstName}</h1>
              <p className="lead text-centre">
                {profile.lastName}
                <br />
                {profile.email}
                <br />

                <span>at {profile.company}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileHeader;
