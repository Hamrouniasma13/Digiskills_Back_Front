import {
  GET_TRAINING,
  TRAINING_LOADING,
  GET_TRAININGS,
  ADD_TRAINING,
  DELETE_TRAINING,
} from "../actions/types";

const initialState = {
  trainings: [],
  training: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRAINING_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TRAININGS:
      return {
        ...state,
        trainings: action.payload,
        loading: false,
      };
    case GET_TRAINING:
      return {
        ...state,
        training: action.payload,
        loading: false,
      };
    case ADD_TRAINING:
      return {
        ...state,
        trainings: [action.payload, ...state.trainings],
      };
    case DELETE_TRAINING:
      return {
        ...state,
        trainings: state.trainings.filter(
          (training) => training._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
