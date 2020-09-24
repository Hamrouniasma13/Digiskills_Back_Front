import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import TrainingItem from "./TrainingItem";
import { getTrainings } from "../../actions/trainingAction";
import { Link } from "react-router-dom";

class Trainings extends Component {
  componentDidMount() {
    this.props.getTrainings();
  }

  render() {
    const { trainings, loading } = this.props.training;
    let trainingItem;

    if (trainings === null || loading) {
      trainingItem = <Spinner />;
    } else {
      trainingItem = trainings.map((training) => (
        <TrainingItem key={training._id} training={training} />
      ));
    }

    return (
      <div className="trainings">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <Link to="/add-training" className="btn btn-lg btn-info">
                  Créer un Plan de formation                </Link>
              </div>
              <h3 className="display-4 text-center">Liste des Formations</h3>
              {trainingItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Trainings.propTypes = {
  getTrainings: PropTypes.func.isRequired,
  training: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  training: state.training,
});

export default connect(mapStateToProps, { getTrainings })(Trainings);
