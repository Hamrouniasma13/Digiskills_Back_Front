import axios from "axios";

import {
  GET_COURSE,
  COURSE_LOADING,
  GET_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  GET_ERRORS,
} from "./types";

// Add Course
export const addCourse = (courseData, history) => (dispatch) => {
  axios
    .post("/api/course/addCourse", courseData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//GET COURSES
export const getCourses = () => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .get("/api/course/allCourses")
    .then((res) =>
      dispatch({
        type: GET_COURSES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_COURSES,
        payload: null,
      })
    );
};
// Set loading state
export const setCourseLoading = () => {
  return {
    type: COURSE_LOADING,
  };
};

// Delete Course
export const deleteCourse = (id) => (dispatch) => {
  axios
    .delete(`/api/course/removeCourse/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_COURSE,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//clear errors
// Clear errors
// export const clearErrors = () => {
//   return {
//     type: CLEAR_ERRORS,
//   };
// };
