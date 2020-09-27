import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteManager } from "../../actions/managerActions";

class ManagerItems extends Component {
  onDeleteClick(id) {
    this.props.deleteManager(id);
  }
  render() {
    const { user } = this.props;

    return (
      <div>
        <div>
          <div>
            <p>{user.lastName}</p>
            <p>{user.firstName}</p>
            <p>{user.role}</p>
            <p>{user.company}</p>
            <button
              onClick={this.onDeleteClick.bind(this, user._id)}
              className="btn btn-danger"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ManagerItems.propTypes = {
  user: PropTypes.object.isRequired,
  deleteManager: PropTypes.func.isRequired,
};

const mapStateToProps = (user) => {
  return {
    user,
  };
};

export default connect(mapStateToProps, { deleteManager })(ManagerItems);
