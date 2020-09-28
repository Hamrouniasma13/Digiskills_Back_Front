import axios from "axios";
import {
  GET_ERRORS,
  MANAGER_LOADING,
  GET_MANAGERS,
  GET_MANAGER,
  DELETE_MANAGER,
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
    .catch(
      (err) => console.log("hii"),
      dispatch({
        type: GET_MANAGERS,
        payload: null,
      })
    );
};

// Delete Manager
export const deleteManager = (id) => (dispatch) => {
  axios
    .delete(`/api/removeUser/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_MANAGER,
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

// Get Manager
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

// Manager loading
export const setManagerLoading = () => {
  return {
    type: MANAGER_LOADING,
  };
};
