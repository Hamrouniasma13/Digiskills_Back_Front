import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addCourse } from '../../actions/courseActions';
import SelectListGroup from "../common/SelectListGroup";

import { connect } from 'react-redux'
import PropTypes from 'prop-types';
class Addcourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            goals: '',
            background: '',
            errors: {}

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const courseData = {
            title: this.state.title,
            description: this.state.description,
            goals: this.state.goals,
            background: this.state.background,

        };

        this.props.addCourse(courseData, this.props.history);
    }

    render() {
        const { errors } = this.state;
        const options = [
            { label: "* Select Background", Value: 0 },
            { label: "IT", value: "IT" },
            { label: "Social media", value: "Social media" },
            { label: "Other", value: "Other" },
        ];
        return (

            <div className="add-courses">
                <div className='container'>
                    <div className="row">
                        <div className='col-md-8 m-auto'>
                            <Link to='/courses' className="btn btn-light">
                                Go Back
                                </Link>
                            <h1 className="display-4 text-center"> Ajouter un cours</h1>
                            <p className="lead text-center">Ajouter cours </p>
                            <small className="d-block pb-3">* = champs obligatoires</small>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="*Titre "
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextAreaFieldGroup
                                    placeholder="* description "
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                />
                                <TextFieldGroup
                                    placeholder="* Objectifs "
                                    name="goals"
                                    value={this.state.goals}
                                    onChange={this.onChange}
                                    error={errors.goals}
                                />
                                <SelectListGroup
                                    placeholder="* Spécialité "
                                    name="background"
                                    value={this.state.background}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.speciality}
                                />

                                <input type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                >
                                </input>

                                <Link to='/addModule' className="btn btn-light">
                                    Suivant
                                </Link>

                            </form>





                        </div>

                    </div>
                </div>


            </div>


        )
    }
}
Addcourse.propTypes = {
    addCourse: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addCourse })(withRouter(Addcourse));
