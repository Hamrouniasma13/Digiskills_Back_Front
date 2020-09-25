import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class LoginLearner extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

<<<<<<< HEAD
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
=======
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }
>>>>>>> 5d1ab853bce07c6f4b4cfdfb2a8457655a249613

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
<<<<<<< HEAD
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-gradient-warning "></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          Bienvenue Sur Digiskills
                        </h1>
                      </div>
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
=======
      <div class="container ">
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-gradient-warning "></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">
                          Bienvenue Sur Digiskills
                          <br/>
                          Espace Apprenant
                        </h1>
                      </div>
                      <form onSubmit={this.onSubmit}>
                        <div class="form-group">
>>>>>>> 5d1ab853bce07c6f4b4cfdfb2a8457655a249613
                          <TextFieldGroup
                            placeholder="Adresse Email"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                          />
                        </div>
<<<<<<< HEAD
                        <div className="form-group">
=======
                        <div class="form-group">
>>>>>>> 5d1ab853bce07c6f4b4cfdfb2a8457655a249613
                          <TextFieldGroup
                            placeholder="Mot de passe"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Connexion"
<<<<<<< HEAD
                          className="btn btn-dark btn-user btn-block"
                        />
                      </form>
                      {/* <hr />
                      <div className="text-center">
                        <a className="small" href="/register">
                          Créer un compte!
                        </a>
                      </div> */}
=======
                          class="btn btn-dark btn-user btn-block"
                        />
                      </form>
                     
>>>>>>> 5d1ab853bce07c6f4b4cfdfb2a8457655a249613
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
=======
        
>>>>>>> 5d1ab853bce07c6f4b4cfdfb2a8457655a249613
      </div>
      // </div>
    );
  }
}

LoginLearner.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(LoginLearner);
