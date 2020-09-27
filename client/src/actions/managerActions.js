import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  MANAGERS_LOADING,
  GET_MANAGERS,
  GET_MANAGER,
  DELETE_MANAGERS,
} from "./types";

export const getManagers = () => (dispatch) => {
  dispatch(setManagerLoading());
  axios
    .get("/api/user/allManagers")
    .then((res) =>
      dispatch({
        type: GET_MANAGERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_MANAGERS,
        payload: null,
      })
    );
};

// Manager loading
export const setManagerLoading = () => {
  return {
    type: MANAGERS_LOADING,
  };
};

// Delete Manager
export const deleteManager = (id) => (dispatch) => {
  axios
    .delete(`/api/removeUser/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_MANAGERS,
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

// Get Training
export const getManager = (id) => (dispatch) => {
  dispatch(setManagerLoading());
  axios
    .get(`/api/userProfile/${id}`)
    .then((res) =>
      dispatch({
        type: GET_MANAGER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_MANAGER,
        payload: null,
      })
    );
};
