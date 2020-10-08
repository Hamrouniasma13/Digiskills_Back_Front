import React from "react";
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
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { setProfileLoading } from "../../actions/profileActions";
import { random } from "lodash";
import { createLogger } from "winston";


class newCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCourses: true,
      courses:[]
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
          <Typography variant="h6">Ajouter un Cours</Typography>
          <Typography variant="body2">Ajouter Un nouveau Cours</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Formik
            initialValues={{
                title: "",
                description: "",
                goals: "",
                background: "",
                target: "",     
            }}
            onSubmit={(values) =>  {
                this.setState({ loadingCourses: true });
                      
                      var myHeaders = new Headers();
                      myHeaders.append("x-auth-token", localStorage.jwtToken);
                      myHeaders.append("Content-Type", "application/json");
                      fetch(
                        "/api/course/addCourse",
                        {
                          method: "POST",
                          headers: myHeaders,
                          body: JSON.stringify({
                              title:values.title,
                              description:values.description,
                              goals:values.goals,
                              background:values.background,
                              target:values.target,

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
              <>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={values.description}
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  fullWidth
                  name="title"
                  label="Titre"
                  value={values.title}
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  fullWidth
                  name="goals"
                  label="Goals"
                  value={values.goals}
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="age-native-simple">
                  background
                  </InputLabel>
                  <Select
                    fullWidth
                    margin="normal"
                    name="background"
                    value={values.background}
                    onChange={handleChange}
                    inputProps={{
                      name: "background",
                    }}
                   
                  >
                    <option aria-label="None" value="" />
                    <option value="IT">IT</option>
                    <option value="Social media">Social media</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>

                 <TextField
                  fullWidth
                  name="target"
                  label="Audience"
                  value={values.target}
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  
                />

                <Button onClick={submitForm}>Submit</Button>
              </>
            )}
          </Formik>
        </Grid>
      </Grid>
    );
  }
}

export default newCourse;
