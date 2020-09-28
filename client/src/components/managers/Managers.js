import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { getManagers } from '../../actions/managerActions'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import ManagersItems from "./ManagersItems"
class Managers extends Component {

    

    render() {
        let managersItems= <ManagersItems/>
          
        return (
            <div className="container">
                <div className="container">
                    <div class="row">
                        <div className="col-md-12">
                            <div>
                                <Link to="/register" className="btn btn-lg btn-info">
                                    Ajouter des Managers
 </Link>
                            </div>
                            <h1 className="display-4 text-center">Managers
                            
                            </h1>
                            <p className="lead text-center">
Choisir votre cours                                 </p>
                            {managersItems}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

Managers.propTypes = {
    getManagers: PropTypes.func.isRequired,
    manager: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    manager: state.manager
})
export default connect(mapStateToProps, {getManagers})(Managers);