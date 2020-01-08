import * as actionTypes from "./actionTypes";
import { moviedb } from "../../apis/axios-movies";

const fetchMoviesFail = error => {
  return {
    type: actionTypes.FETCH_MOVIES_FAIL,
    payload: { error }
  };
};

const fetchMoviesStart = () => {
  return {
    type: actionTypes.FETCH_MOVIES_START
  };
};

const fetchMoviesSuccess = (movies, category) => {
  return {
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    payload: { movies, category }
  };
};

const fetchMovieFail = error => {
  return {
    type: actionTypes.FETCH_MOVIE_FAIL,
    payload: { error }
  };
};

const fetchMovieStart = () => {
  return {
    type: actionTypes.FETCH_MOVIE_START
  };
};

const fetchMovieSuccess = movie => {
  return {
    type: actionTypes.FETCH_MOVIE_SUCCESS,
    payload: { movie }
  };
};

const fetchSearchFail = error => {
  return {
    type: actionTypes.FETCH_SEARCH_FAIL,
    payload: { error }
  };
};

const fetchSearchStart = () => {
  return {
    type: actionTypes.FETCH_SEARCH_START
  };
};

const fetchSearchSuccess = search => {
  return {
    type: actionTypes.FETCH_SEARCH_SUCCESS,
    payload: { search }
  };
};

export const fetchMovies = (page, category) => async dispatch => {
  dispatch(fetchMoviesStart());
  try {
    const response = await moviedb.get(`/movie/${category}`, {
      params: { api_key: actionTypes.API_KEY, page }
    });

    dispatch(fetchMoviesSuccess(response.data, category));
  } catch (error) {
    dispatch(fetchMoviesFail(error));
  }
};

export const fetchMovie = id => async dispatch => {
  dispatch(fetchMovieStart());
  try {
    const response = await moviedb.get(`/movie/${id}`, {
      params: { api_key: actionTypes.API_KEY, append_to_response: "videos" }
    });

    dispatch(fetchMovieSuccess(response.data));
  } catch (error) {
    dispatch(fetchMovieFail(error));
  }
};

export const fetchSearch = (term, page) => async dispatch => {
  dispatch(fetchSearchStart());
  try {
    const response = await moviedb.get(`/search/movie`, {
      params: {
        query: term.split(" ").join("+"),
        api_key: actionTypes.API_KEY,
        page
      }
    });
    dispatch(fetchSearchSuccess(response.data));
  } catch (error) {
    dispatch(fetchSearchFail(error));
  }
};
