import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";
import { Formik, FieldArray } from "formik";


class EditPassword extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       password: "",
    //     };
    // }
        onSubmit(e) {
            e.preventDefault();
        
            const userData = {
                oldPW: this.state.oldPW,
                newPW: this.state.newPW,
            };
          }
    render() {
        return (
            <Grid container item xs={12}>
        <Grid
          container
          item
          xs={12}
          direction="column"
          justify="center"
          alignContent="center"
        >
          <Typography variant="h6">  Mot De Passe</Typography>
          <Typography variant="body2">Changer Mot De Passe</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Formik 
            initialValues={{
                oldPW: "",
                newPW:""   
            }}
            onSubmit={(values) =>  {
                this.setState({ loadingCourses: true });
                      
                      var myHeaders = new Headers();
                      myHeaders.append("x-auth-token", localStorage.jwtToken);
                      myHeaders.append("Content-Type", "application/json");
                      fetch(
                        "/api/user/changePassword",
                        {
                          method: "PUT",
                          headers: myHeaders,
                          body: JSON.stringify({
                            oldPW:values.oldPW,
                            newPW:values.newPW
                          })
                        }
                      )
                        .then((res) => res.json())
                        .catch(error => console.error(`Error:`, error))
                        .then(response => console.log(`Success:`, response)); 
                    }}
            
          >
            {({
              values,
              handleChange,
              handleBlur,
              submitForm,
              setFieldValue,
            }) => (
              <Grid container
          item
          xs={12}
          direction="column"
          justify="center"
          alignContent="center">
            <div className="text-center">
                <TextField
                  fullWidth
                  name="oldPW"
                  label="old Mot de passe"
                  value={values.oldPW}
                  variant="outlined"
                  margin="normal"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  
                />    
                <TextField
                  fullWidth
                  name="newPW"
                  label="nv Mot de passe"
                  value={values.newPW}
                  variant="outlined"
                  margin="normal"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />                 
                  </div>         
          <Button onClick={submitForm} className="btn btn-warning btn-user btn-block">Changer</Button>
              </Grid>
            )}
          </Formik>
        </Grid>
      </Grid>
        )
    }
}
export default EditPassword