import React, { Component } from "react";
import { getManagers } from "../../actions/managerActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ManagerItems from "./ManagerItems";
import Spinner from "../common/Spinner";

class ListManagers extends Component {
  componentDidMount() {
    this.props.getManagers();
  }

  render() {
    // const { users, loading } = this.props.user;
    const { user } = this.props;
    let managerItems = <ManagerItems key={user._id} user={user} />;

    return (
      <div className="trainings">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="display-4 text-center">Liste des Managers</h3>
              {managerItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ListManagers.propTypes = {
  getManagers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (user) => {
  return {
    user,
  };
};

export default connect(mapStateToProps, { getManagers })(ListManagers);
