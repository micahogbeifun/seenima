import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const fetchMoviesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchMoviesSuccess = (state, action) => {
  const { movies, category } = action.payload;
  return updateObject(state, {
    [category]: updateObject(state[category], movies),
    loading: false
  });
};

const fetchMoviesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchSearchStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchSearchSuccess = (state, action) => {
  return updateObject(state, {
    search: updateObject(state.search, action.payload.search),
    loading: false
  });
};

const fetchSearchFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchMovieStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchMovieSuccess = (state, action) => {
  return updateObject(state, {
    movie: updateObject(state.movie, action.payload.movie),
    loading: false
  });
};

const fetchMovieFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES_START:
      return fetchMoviesStart(state, action);
    case actionTypes.FETCH_MOVIES_SUCCESS:
      return fetchMoviesSuccess(state, action);
    case actionTypes.FETCH_MOVIES_FAIL:
      return fetchMoviesFail(state, action);
    case actionTypes.FETCH_SEARCH_START:
      return fetchSearchStart(state, action);
    case actionTypes.FETCH_SEARCH_SUCCESS:
      return fetchSearchSuccess(state, action);
    case actionTypes.FETCH_SEARCH_FAIL:
      return fetchSearchFail(state, action);
    case actionTypes.FETCH_MOVIE_START:
      return fetchMovieStart(state, action);
    case actionTypes.FETCH_MOVIE_SUCCESS:
      return fetchMovieSuccess(state, action);
    case actionTypes.FETCH_MOVIE_FAIL:
      return fetchMovieFail(state, action);
    default:
      return state;
  }
};

export default reducer;
