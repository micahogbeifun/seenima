import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import authReducer from "./authReducer";
import itemsReducer from "./itemsReducer";
//import { reducer as formReducer } from "redux-form";
//import streamReducer from "./streamReducer";

export default combineReducers({
  movies: moviesReducer,
  auth: authReducer,
  myList: itemsReducer //streams: streamReducer
});
