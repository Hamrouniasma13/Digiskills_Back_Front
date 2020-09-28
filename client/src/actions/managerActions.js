import axios from "axios";

import {
    GET_MANAGER,
    MANAGER_LOADING,
    GET_MANAGERS,
    ADD_MANAGER,
    DELETE_MANAGER,
    GET_ERRORS,
} from "./types";



//GET COURSES
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
// Set loading state
export const setManagerLoading = () => {
    return {
        type: MANAGER_LOADING,
    };
};

// Delete Course
// export const deleteCourse = (id) => (dispatch) => {
//     axios
//         .delete(`/api/courses/${id}`)
//         .then((res) =>
//             dispatch({
//                 type: DELETE_COURSE,
//                 payload: id,
//             })
//         )
//         .catch((err) =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data,
//             })
//         );
// };

//clear errors
// Clear errors
// export const clearErrors = () => {
//   return {
//     type: CLEAR_ERRORS,
//   };
// };
