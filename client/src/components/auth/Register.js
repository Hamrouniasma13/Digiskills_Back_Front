import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// import axios from 'axios'
// import classnames from 'classnames';
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const { user } = this.props.auth;
    const options = [
      { label: "Choisir un Role", Value: 0 },
      { label: "Learner", value: "Learner" },
      { label: "Responsable formation", value: "TrainingManager" },
      { label: "Manager", value: "Manager" },
      { label: "Admin", value: "Admin" },
    ];
    return (
      <div class="bg-gradient-warning">
        <div class="container">
          <div class="card o-hidden border-0 shadow-lg my-5">
            {/* //   
          
      //       <div class="card-body p-0">
      //         <div class="row">
      //           <div class="col-lg-7">
      //             <div class="p-5"> */}
            <div class="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Ajouter un compte</h1>
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <TextFieldGroup
                          placeholder="Prénom"
                          name="firstName"
                          type="firstName"
                          value={this.state.firstName}
                          onChange={this.onChange}
                          error={errors.firstName}
                        />
                      </div>
                      <div class="col-sm-6">
                        <TextFieldGroup
                          placeholder="Nom"
                          name="lastName"
                          type="lastName"
                          value={this.state.lastName}
                          onChange={this.onChange}
                          error={errors.lastName}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <TextFieldGroup
                        placeholder="Adresse E-mail"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
                    </div>
                    <div class="form-group">
                      <div class="col-sm-18 mb-3 mb-sm-0">
                        <TextFieldGroup
                          placeholder="Mot de passe"
                          name="password"
                          type="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          error={errors.password}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <SelectListGroup
                        name="role"
                        value={this.state.role}
                        onChange={this.onChange}
                        options={options}
                        error={errors.role}
                      />
                    </div>



                    <input
                      type="submit"
                      className="btn btn-warning btn-user btn-block"
                    />
                  </form>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
