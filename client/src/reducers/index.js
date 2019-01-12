// This is the main reducer which will basically bring in all other reducers
import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer
});
