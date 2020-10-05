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

import CoursesTags from "./coursesTags";

class NewTraining extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCourses: true,
      courses: [],
      selectedCourses: [],
    };
    this.DeleteCourse = this.DeleteCourse.bind(this);
  }

  DeleteCourse(index, setFieldValue) {
    let newSelectedCourses = this.state.selectedCourses.filter(
      (value, i) => i !== index
    );
    this.setState((prev) => ({
      selectedCourses: newSelectedCourses,
    }));
    setFieldValue("courses", newSelectedCourses);
  }

  // componentDidMount() {
  //   var myHeaders = new Headers();
  //   myHeaders.append(
  //     "x-auth-token",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjZlMzlmODEyMDgzNDE5NjhjZGQ4YmIiLCJyb2xlIjoiTWFuYWdlciIsImlhdCI6MTYwMTI5MDM1Mn0.LvpkrY5DWfLTRgQgM65SyUMUgmBGBkFQvURwYgX4KwY"
  //   );
  //   myHeaders.append("Content-Type", "application/json");
  //   fetch("/api/course/allCourses", {
  //     method: "GET",
  //     headers: myHeaders,
  //   })
  //     .then((res) => res.json())
  //     .then((result) =>
  //       this.setState({
  //         loadingCourses: false,
  //         courses: result,
  //       })
  //     );
  // }
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
              courses: this.state.selectedCourses,
            }}
            onSubmit={(values, { setFieldValue }) => {
              console.log(values);
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
                    onChange={(e) => {
                      this.setState({ loadingCourses: true });
                      const selectedSpec = e.target.value;
                      setFieldValue("speciality", selectedSpec);
                      var myHeaders = new Headers();
                      myHeaders.append(
                        "x-auth-token",
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjZlMzlmODEyMDgzNDE5NjhjZGQ4YmIiLCJyb2xlIjoiTWFuYWdlciIsImlhdCI6MTYwMTI5MDM1Mn0.LvpkrY5DWfLTRgQgM65SyUMUgmBGBkFQvURwYgX4KwY"
                      );
                      myHeaders.append("Content-Type", "application/json");
                      fetch(
                        `/api/course/displayCourseByBackground/${selectedSpec}`,
                        {
                          method: "GET",
                          headers: myHeaders,
                        }
                      )
                        .then((res) => res.json())
                        .then((res) =>
                          this.setState({
                            courses: res,
                            loadingCourses: false,
                          })
                        );
                    }}
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
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="age-native-simple">Cours</InputLabel>
                    <Select
                      fullWidth
                      margin="normal"
                      name="courses"
                      defaultValue="1"
                      value={values.speciality}
                      onChange={async (e) => {
                        await this.setState((prevState) => ({
                          selectedCourses: prevState.selectedCourses.concat(
                            e.target.value
                          ),
                        }));

                        setFieldValue("courses", this.state.selectedCourses);
                      }}
                      inputProps={{
                        name: "courses",
                      }}
                    >
                      <option value="1">choose Course...</option>
                      {this.state.courses.map(
                        (course) =>
                          !(
                            this.state.selectedCourses.indexOf(course.title) >=
                            0
                          ) && (
                            <option
                              key={Math.random().toString(36).substring(7)}
                              value={course.title}
                            >
                              {course.title}
                            </option>
                          )
                      )}
                    </Select>
                  </FormControl>
                )}
                {this.state.selectedCourses.length > 0 && (
                  <Grid container item xs={12}>
                    {this.state.selectedCourses.map((course, index) => (
                      <CoursesTags
                        key={Math.random().toString(36).substring(7)}
                        index={index}
                        course={course}
                        setFieldValue={setFieldValue}
                        DeleteCourse={this.DeleteCourse}
                      />
                    ))}
                  </Grid>
                )}

                <TextField
                  fullWidth
                  name="startDate"
                  label="Date Debut"
                  type="date"
                  value={values.startDate}
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  name="endDate"
                  label="Date Fin"
                  type="date"
                  value={values.endDate}
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
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

export default NewTraining;
