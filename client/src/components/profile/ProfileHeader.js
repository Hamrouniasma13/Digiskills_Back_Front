import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import img from "../../assets/img/avatar.png";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { Formik, FieldArray } from "formik";
import { TextField, Button } from "@material-ui/core";
class ProfileHeader extends Component {
  onup(Name) {
    console.log(Name);
    return (
      <p>hello</p>

      // <Formik
      //   initialValues={{
      //     firstName: Name,
      //   }}
      //   onSubmit={(values) => {
      //     this.setState({ loadingCourses: true });
      //     var myHeaders = new Headers();
      //     myHeaders.append("x-auth-token", localStorage.jwtToken);
      //     myHeaders.append("Content-Type", "application/json");
      //     fetch("/api/user/changeName", {
      //       method: "PUT",
      //       headers: myHeaders,
      //       body: JSON.stringify({
      //         firstName: values.firstName,
      //       }),
      //     })
      //       .then((res) => res.json())
      //       .catch((error) => console.error(`Error:`, error))
      //       .then((response) => console.log(`Success:`, response));
      //     console.log(values);
      //   }}
      // >
      //   {({ values, handleChange, handleBlur, submitForm, setFieldValue }) => (
      //     <>
      //       <TextField
      //         fullWidth
      //         name="firstName"
      //         label="Prénom"
      //         value={values.firstName}
      //         variant="outlined"
      //         margin="normal"
      //         onChange={handleChange}
      //         onBlur={handleBlur}
      //       />
      //       <Button onClick={submitForm}>Submit</Button>
      //     </>
      //   )}
      // </Formik>
    );
  }
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light text-black mb-3">
            {/* <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={img} alt="" />
              </div>
            </div> */}
            <div className="text-center">
              <h1 className="displa-4 text-center">
                {profile.firstName} &nbsp;&nbsp;
                <CreateOutlinedIcon
                  onClick={() => this.onup.bind(this, profile.firstName)}
                ></CreateOutlinedIcon>
              </h1>

              <p className="lead text-centre">
                {profile.lastName}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CreateOutlinedIcon onClick=""></CreateOutlinedIcon>
                <br />
                {profile.email}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CreateOutlinedIcon onClick=""></CreateOutlinedIcon>
                <br />
                <span>at {profile.company}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CreateOutlinedIcon onClick=""></CreateOutlinedIcon>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileHeader;
