import { combineReducers } from "redux";
import postReducer from "../../Post/ducks/reducer";

export default combineReducers({ post: postReducer });
