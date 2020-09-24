import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_TRAINING,
  TRAINING_LOADING,
  GET_TRAININGS,
  DELETE_TRAINING,
  UPLOAD_DOCUMENT_SUCCESS, UPLOAD_DOCUMENT_FAIL
} from "./types";
export function uploadSuccess({ data }) {
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    data,
  };
}

export function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}

// Add Training
export const addTraining = (expData, history) => (dispatch) => {
axios.post("/api/training", expData)

    .then((res) => history.push("/trainings"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Get Trainings
export const getTrainings = () => (dispatch) => {
  dispatch(setTrainingLoading());
  axios
    .get("/api/training")
    .then((res) =>
      dispatch({
        type: GET_TRAININGS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_TRAININGS,
        payload: null,
      })
    );
};

// Get Training
export const getTraining = (id) => (dispatch) => {
  dispatch(setTrainingLoading());
  axios
    .get(`/api/training/${id}`)
    .then((res) =>
      dispatch({
        type: GET_TRAINING,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_TRAINING,
        payload: null,
      })
    );
};

// Delete Training
export const deleteTraining = (id) => (dispatch) => {
  axios
    .delete(`/api/training/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_TRAINING,
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

// Set loading state
export const setTrainingLoading = () => {
  return {
    type: TRAINING_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
// export function uploadDocumentRequest({ file, name }) {
//   let data = new FormData();
//   data.append('file', document);
//   data.append('name', name);

//   return (dispatch) => {
//     axios.post('/files', data)
//       .then(response => dispatch(uploadSuccess(response))
//       .catch(error => dispatch(uploadFail(error));
//   };
// }