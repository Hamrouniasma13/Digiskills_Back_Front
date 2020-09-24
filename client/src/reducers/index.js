import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "../reducers/profileReducer";
import trainingReducer from "../reducers/trainingReducer";
import courseReducer from "../reducers/courseReducer"
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  training: trainingReducer,
  course: courseReducer
});
