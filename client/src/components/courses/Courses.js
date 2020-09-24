import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { getCourses } from '../../actions/courseActions'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import CourseItemss from "./CourseItemss"
class Courses extends Component {

    componentDidMount() {
        this.props.getCourses();

    }

    render() {
        const { courses, loading } = this.props.course
        let coursesItems;

        if (courses === null || loading) {
            coursesItems = <Spinner />
        } else {
            if (courses.length > 0) {
                coursesItems = courses.map(course =>
                    (
                        <CourseItemss key={course._id} course={course} />
                    ))
            } else {
                coursesItems = <h4>No courses Found ... </h4>
            }
        }
        return (
            <div className="courses">
                <div className="container">
                    <div class="row">
                        <div className="col-md-12">
                            <div>
                                <Link to="/addcourses" className="btn btn-lg btn-info">
                                    Ajouter des cours
 </Link>
                            </div>
                            <h1 className="display-4 text-center">Cours
                            
                            </h1>
                            <p className="lead text-center">
Choisir votre cours                                 </p>
                            {coursesItems}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

Courses.propTypes = {
    getCourses: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    course: state.course
})
export default connect(mapStateToProps, { getCourses })(Courses);