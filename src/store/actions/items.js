import * as actionTypes from "./actionTypes";
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDOvhqLDb20Ss3LqAKs3a1bTwdN1g275Bk",
  authDomain: "pig-game-9803a.firebaseapp.com",
  projectId: "pig-game-9803a"
});

const db = firebase.firestore();

export const addItemSuccess = (id, movieData) => {
  return {
    type: actionTypes.ADD_ITEM_SUCCESS,
    payload: { id, movieData }
  };
};

export const addItemFail = error => {
  return {
    type: actionTypes.ADD_ITEM_FAIL,
    payload: { error }
  };
};

export const addItemStart = () => {
  return { type: actionTypes.ADD_ITEM_START };
};

export const addItem = data => async dispatch => {
  dispatch(addItemStart());
  try {
    const movieData = {
      ...data,
      date: new Date().getTime()
    };
    const response = await db.collection(data.userId).add(movieData);

    dispatch(addItemSuccess(response.id, movieData));
  } catch (error) {
    dispatch(addItemFail(error));
  }
};

export const addInit = () => {
  return { type: actionTypes.ADD_INIT };
};

export const deleteItemSuccess = (movieData, response) => {
  return {
    type: actionTypes.DELETE_ITEM_SUCCESS,
    payload: { movieData, response }
  };
};

export const deleteItemFail = error => {
  return {
    type: actionTypes.DELETE_ITEM_FAIL,
    payload: { error }
  };
};

export const deleteItemStart = () => {
  return { type: actionTypes.DELETE_ITEM_START };
};

export const deleteItem = movieData => async dispatch => {
  dispatch(deleteItemStart());
  try {
    const response = await db
      .collection(movieData.userId)
      .doc(movieData.id)
      .delete();
    dispatch(deleteItemSuccess(movieData, response));
  } catch (error) {
    dispatch(deleteItemFail(error));
  }
};

export const deleteInit = () => {
  return { type: actionTypes.DELETE_INIT };
};

export const fetchListSuccess = list => {
  return {
    type: actionTypes.FETCH_LIST_SUCCESS,
    payload: { list }
  };
};

export const fetchListFail = error => {
  return {
    type: actionTypes.FETCH_LIST_FAIL,
    payload: { error }
  };
};

export const fetchListStart = () => {
  return {
    type: actionTypes.FETCH_LIST_START
  };
};

export const fetchList = userId => async dispatch => {
  dispatch(fetchListStart());
  try {
    const response = await db.collection(userId).get();

    const fetchedList = [];
    response.forEach(doc => {
      if (!doc.data().userName) {
        fetchedList.push({
          ...doc.data(),
          id: doc.id
        });
      }
    });
    dispatch(fetchListSuccess(fetchedList));
  } catch (error) {
    dispatch(fetchListFail(error));
  }
};
