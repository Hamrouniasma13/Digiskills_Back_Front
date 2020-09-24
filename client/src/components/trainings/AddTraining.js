import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTraining } from "../../actions/trainingAction";
import { getCourses } from "../../actions/courseActions";
import Chip from "../common/Chip";
import jsPDF from "jspdf";

class AddTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      datedebut: "",
      datefin: "",
      speciality: "",
      course: "",
      coursesList: [],
      errors: {},
      addedCourses: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.props.getCourses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  jsPdfGenerator = () => {
    var doc = new jsPDF("p", "pt");

    doc.text(20, 20, "this is default text ");

    // set the foont
    doc.setFont("courier");

    // doc.setFontType('normal')
    doc.text(20, 30, "this is text with courier font");
    // save the document
    doc.save("generated.pdf");
  };

  onSubmit(e) {
    e.preventDefault();
    const expData = {
      title: this.state.title,
      speciality: this.state.speciality,
      datedebut: this.state.datedebut,
      datefin: this.state.datefin,
      courses: this.state.addedCourses,
    };

    // console.log(expData);
    this.props.addTraining(expData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  done = () => {
    // after adding new course get all courses again
    this.props.getCourses();
    // close the modal
    this.myRef.current.click();
  };

  // add Chip
  handleAddChip = (e) => {
    let selectedCourse = this.props.courses.courses.filter(
      (course) => course._id === e.target.value
    );

    this.setState({
      addedCourses: [...this.state.addedCourses, selectedCourse[0]],
    });
  };

  // remove Chip
  handleDeleteChip = (id) => {
    let filtredAddedCourses = this.state.addedCourses.filter(
      (course) => course._id !== id
    );

    this.setState({ addedCourses: filtredAddedCourses });
  };

  render() {
    const { errors, addedCourses, speciality } = this.state;
    const { courses } = this.props;

    let coursesList =
      !courses.loading &&
      courses.courses
        .filter((course) => {
          // make sure to render all courses that are NOT displayed in Chips
          let noMatch = true;

          for (let i = 0; i < addedCourses.length; i++) {
            if (addedCourses[i]._id === course._id) {
              noMatch = false;
            }
          }
          return noMatch;
        })
        .map((course) => ({ label: course.title, Value: course._id }));

    let coursesListspec = courses.courses.filter(
      (course) => course.background.toLowerCase() === speciality.toLowerCase()
    );

    //Select options for status
    const options = [
      { label: "", Value: "" },
      { label: "IT", value: "IT" },
      { label: "Social media", value: "Social media" },
      { label: "Marketing", value: "Marketing" },
      { label: "Other", value: "Other" },
    ];
    return (
      <div class="container ">
        <div className="add-training">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                {/* <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link> */}
                <h2 className="display-6 text-center">
                  Ajouter un Plan de Formation{" "}
                </h2>
                <p className="lead text-center">Ajouter Un nouveau Plan </p>
                <small className="d-block pb-3">*=champs obligatoires</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Titre"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                    required
                  />

                  {/* <TextFieldGroup
                  placeholder="* Training Plan speciality"
                  name="speciality"
                  value={this.state.speciality}
                  onChange={this.onChange}
                  error={errors.speciality}
                /> */}

                  <SelectListGroup
                    placeholder="* Spécialité"
                    name="speciality"
                    value={this.state.speciality}
                    onChange={this.onChange}
                    options={options}
                    error={errors.speciality}
                    required
                  />

                  <div>
                    {coursesListspec.map((course, index) => {
                      return (
                        <span key={index}>
                          <Chip
                            key={index}
                            title={course.title}
                            background={course.background}
                            id={course._id}
                            handleClose={this.handleDeleteChip}
                          />
                        </span>
                      );
                    })}
                  </div>

                  {!courses.loading ? (
                    <div>
                      {/* <SelectListGroup
                      placeholder="* Cours"
                      name="course"
                      value={this.state.course}
                      onChange={this.handleAddChip}
                      options={[{ label: "", Value: "" }, ...coursesList]}
                      error={errors.speciality}
                      placeholder="* Choisir un Cours"
                    /> */}
                      {addedCourses.map((course, index) => {
                        return (
                          <Chip
                            key={index}
                            title={course.title}
                            background={course.background}
                            id={course._id}
                            handleClose={this.handleDeleteChip}
                          />
                        );
                      })}
                    </div>
                  ) : (
                      <div>
                        <p>Loading Courses...</p>
                      </div>
                    )}

                  <h6>Date Début</h6>
                  <TextFieldGroup
                    name="datedebut"
                    type="date"
                    value={this.state.datedebut}
                    onChange={this.onChange}
                    error={errors.datedebut}
                  />
                  <h6>Date Fin</h6>
                  <TextFieldGroup
                    name="datefin"
                    type="date"
                    value={this.state.datefin}
                    onChange={this.onChange}
                    error={errors.datefin}
                  />
                  <button type="submit" className="btn btn-info btn-block mt-4">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddTraining.propTypes = {
  addTraining: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, errors, course }) => ({
  profile,
  errors,
  courses: course,
});

export default connect(mapStateToProps, { addTraining, getCourses })(
  withRouter(AddTraining)
);
