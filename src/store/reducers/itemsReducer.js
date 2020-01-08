import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  loading: false,
  favs: [],
  fetched: false
};

const addInit = (state, action) => {
  return updateObject(state, { added: false });
};

const addItemStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addItemSuccess = (state, action) => {
  const newItem = updateObject(action.payload.movieData, {
    id: action.payload.id
  });
  return updateObject(state, {
    loading: false,
    fetched: false,
    favs: state.favs.concat(newItem)
  });
};

const addItemFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};

const deleteItemStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteItemSuccess = (state, action) => {
  const newFavs = state.favs.filter(
    fav => fav.movieId !== action.payload.movieData.movieId
  );
  return updateObject(state, {
    loading: false,
    added: true,
    fetched: false,
    favs: newFavs
  });
};

const deleteItemFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};

const fetchListStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchListSuccess = (state, action) => {
  return updateObject(state, {
    favs: action.payload.list,
    loading: false,
    fetched: true
  });
};

const fetchListFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload.error,
    fetched: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INIT:
      return addInit(state, action);
    case actionTypes.ADD_ITEM_START:
      return addItemStart(state, action);
    case actionTypes.ADD_ITEM_SUCCESS:
      return addItemSuccess(state, action);
    case actionTypes.ADD_ITEM_FAIL:
      return addItemFail(state, action);
    case actionTypes.DELETE_ITEM_START:
      return deleteItemStart(state, action);
    case actionTypes.DELETE_ITEM_SUCCESS:
      return deleteItemSuccess(state, action);
    case actionTypes.DELETE_ITEM_FAIL:
      return deleteItemFail(state, action);
    case actionTypes.FETCH_LIST_START:
      return fetchListStart(state, action);
    case actionTypes.FETCH_LIST_SUCCESS:
      return fetchListSuccess(state, action);
    case actionTypes.FETCH_LIST_FAIL:
      return fetchListFail(state, action);
    default:
      return state;
  }
};

export default reducer;
