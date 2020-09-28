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
import BackspaceIcon from "@material-ui/icons/Backspace";
import { setProfileLoading } from "../../actions/profileActions";
class NewTraining extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCourses: true,
      courses: "",
    };
  }

  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append(
      "x-auth-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjZlMzlmODEyMDgzNDE5NjhjZGQ4YmIiLCJyb2xlIjoiTWFuYWdlciIsImlhdCI6MTYwMTI5MDM1Mn0.LvpkrY5DWfLTRgQgM65SyUMUgmBGBkFQvURwYgX4KwY"
    );
    myHeaders.append("Content-Type", "application/json");
    fetch("/api/course/allCourses", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          loadingCourses: false,
          courses: result,
        })
      );
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
          <Typography variant="h6">Ajouter un Plan de Formation</Typography>
          <Typography variant="body2">Ajouter Un nouveau Plan</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Formik
            initialValues={{
              title: "",
              speciality: "",
              startDate: "",
              endDate: "",
              courses: [
                {
                  title: "",
                },
              ],
            }}
            onSubmit={(values) => console.log(values)}
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

                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="age-native-simple">
                    Spécialité
                  </InputLabel>
                  <Select
                    fullWidth
                    margin="normal"
                    name="speciality"
                    value={values.speciality}
                    onChange={handleChange}
                    inputProps={{
                      name: "speciality",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="IT">IT</option>
                    <option value="Social media">Social media</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>

                {!this.state.loadingCourses && (
                  <FieldArray name="courses">
                    {({ remove, push }) => (
                      <>
                        {values.courses.length > 0 &&
                          values.courses.map((course, index) => (
                            <Grid key={index} container item xs={12}>
                              <Grid item xs={10}>
                                <FormControl style={{ width: "100%" }}>
                                  <InputLabel htmlFor="age-native-simple">
                                    Background
                                  </InputLabel>
                                  <Select
                                    fullWidth
                                    margin="normal"
                                    name={`courses.${index}.title`}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `courses.${index}.title`,
                                        e.target.value
                                      )
                                    }
                                    inputProps={{
                                      name: "speciality",
                                    }}
                                  >
                                    {this.state.courses.map((course) => (
                                      <option
                                        key={course._id}
                                        value={course.title}
                                      >
                                        {course.title}
                                      </option>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid container alignContent="center" item xs={2}>
                                <IconButton
                                  onClick={() => remove(index)}
                                  aria-label="add"
                                  size="small"
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  <BackspaceIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    push({
                                      title: "",
                                    })
                                  }
                                  style={{
                                    color: "green",
                                  }}
                                  aria-label="add"
                                  size="small"
                                >
                                  <AddBoxIcon fontSize="inherit" />
                                </IconButton>
                              </Grid>
                            </Grid>
                          ))}
                      </>
                    )}
                  </FieldArray>
                )}
                <Button onClick={submitForm}>Submit</Button>
              </>
            )}
          </Formik>
        </Grid>
      </Grid>
    );
  }
}

export default NewTraining;
