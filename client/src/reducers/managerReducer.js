import {
  DELETE_MANAGER,
  GET_MANAGERS,
  GET_MANAGER,
  MANAGER_LOADING,
} from "../actions/types";

const initialState = {
  managers: null,
  manager: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MANAGER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MANAGERS:
      return {
        ...state,
        managers: action.payload,
        loading: false,
      };
    case GET_MANAGER:
      return {
        ...state,
        manager: action.payload,
        loading: false,
      };
    case DELETE_MANAGER:
      return {
        ...state,
        managers: state.managers.filter(
          (manager) => manager._id !== action.payload
        ),
      };

    default:
      return state;
  }
}
