import {
  DELETE_MANAGERS,
  GET_MANAGERS,
  GET_MANAGER,
  MANAGERS_LOADING,
} from "../actions/types";

const initialState = {
  users: [],
  user: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MANAGERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MANAGERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_MANAGER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case DELETE_MANAGERS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    default:
      return state;
  }
}
