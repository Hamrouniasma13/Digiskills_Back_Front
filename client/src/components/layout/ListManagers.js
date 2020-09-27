import React, { Component } from 'react'
import { getManagers } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ManagerItems from './ManagerItems';
import Spinner from "../common/Spinner";


 class ListManagers extends Component {
    componentDidMount() {
        this.props.getManagers();
      }

    render() {
    
        const { users, loading } = this.props.user;
        let managerItems;
    
        if (users === null || loading) {
          managerItems = <Spinner />;
        } else {
          managerItems = users.map((user) => (
            <ManagerItems key={user._id} user={user} />
          ));
        }        return (
            <div className="trainings">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
             
              <h3 className="display-4 text-center">Liste des Formations</h3>
              {managerItems}
            </div>
          </div>
        </div>
      </div>
        )
    }
}

ListManagers.propTypes = {
    getManagers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps, { getManagers })(ListManagers);

