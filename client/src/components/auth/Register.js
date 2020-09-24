import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// import axios from 'axios'
// import classnames from 'classnames';
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const { user } = this.props.auth;
    return (
      <div class="bg-gradient-warning">
        <div class="container">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-5 d-none d-lg-block "></div>
                <div class="col-lg-7">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Créer un compte</h1>
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
                          info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                        />
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <TextFieldGroup
                            placeholder="Mot de passe"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                          />
                        </div>
                        <div class="col-sm-6">
                          <TextFieldGroup
                            placeholder="Confirmer mot de passe"
                            name="password2"
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                          />
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-warning btn-user btn-block"
                      />
                    </form>
                    <hr />

                    <div class="text-center">
                      <a class="small" href="/login">
                        Connexion
                      </a>
                    </div>
                  </div>
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
