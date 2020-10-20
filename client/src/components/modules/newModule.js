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
import { withRouter } from "react-router-dom";

import { Formik, FieldArray } from "formik";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { setProfileLoading } from "../../actions/profileActions";
import { random } from "lodash";
import UpFile from './UplodeFile'


class newModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingModule: true,
      modules: [],
    
    };
  }

  
  render() {
    const history = this.props.history;
    const courseId = history.location.state.courseId;
    console.log("the course id is : " + courseId)
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
          <Typography variant="h6">Ajouter un Module</Typography>
          <Typography variant="body2">Ajouter Un nouveau Module</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Formik
            initialValues={{
                courseId : courseId,
              title: "",
              description: "",
             
            }}
            onSubmit={(values) => {
                        
                this.setState({ loadingModule: true });
                      var myHeaders = new Headers();
                      myHeaders.append("x-auth-token", localStorage.jwtToken);
                      myHeaders.append("Content-Type", "application/json");
                      fetch(
                        `/api/module/addModule/${courseId}`,
                        {
                          method: "POST",
                          headers: myHeaders,
                          body: JSON.stringify({
                              title:values.title,
                              description:values.description,
                              
                          })
                        }
                      )
                        .then((res) => res.json())
                        .catch(error => console.error(`Error:`, error))
                        .then(response => console.log(`Success:`, response)); 
                    }
            }
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
                  name="description"
                  label="Description"
                  value={values.description}
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

export default (withRouter(newModule));
