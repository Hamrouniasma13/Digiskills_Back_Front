import React, { Component } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTraining } from "../../actions/trainingAction";

class TrainingItem extends Component {
  onDeleteClick(id) {
    this.props.deleteTraining(id);
  }
  render() {
    const { training } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-10 col-md-4 col-8">
            <h3>{training.title}</h3>
            <p>{training.speciality}</p>
            <p>
              <Moment format="YYYY/MM/DD">{training.datedebut}</Moment> -
              <Moment format="YYYY/MM/DD">{training.datefin}</Moment>
            </p>
            <button
              onClick={this.onDeleteClick.bind(this, training._id)}
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

TrainingItem.propTypes = {
  deleteTraining: PropTypes.func.isRequired,
  training: PropTypes.object.isRequired,
};

export default connect(null, { deleteTraining })(TrainingItem);
