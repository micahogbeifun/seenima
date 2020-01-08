import axios from "axios";
import firebase from "firebase";

import * as actionTypes from "./actionTypes";

const db = firebase.firestore();

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (idToken, userId, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { idToken, userId, username }
  };
};

export const authFail = error => {
  return { type: actionTypes.AUTH_FAIL, payload: { error } };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => dispatch(logout()), expirationTime * 1000);
};

export const auth = (username, email, password, isSignup) => async dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOvhqLDb20Ss3LqAKs3a1bTwdN1g275Bk";
  if (!isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOvhqLDb20Ss3LqAKs3a1bTwdN1g275Bk";
  }
  try {
    const response = await axios.post(url, authData);
    let storedName, userName;
    if (isSignup) {
      storedName = await db
        .collection(response.data.localId)
        .add({ username: username, userName: true });
      localStorage.setItem("username", username);
    }

    if (!isSignup) {
      storedName = await db
        .collection(response.data.localId)
        .where("userName", "==", true)
        .get();
      storedName.forEach(doc => {
        userName = doc.data().username;
        localStorage.setItem("username", userName);
      });
    }

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    localStorage.setItem("token", response.data.idToken);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", response.data.localId);

    dispatch(
      authSuccess(
        response.data.idToken,
        response.data.localId,
        isSignup ? username : userName
      )
    );
    dispatch(checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    dispatch(authFail(error.response.data.error));
  }
};

export const setAuthRedirectPath = path => {
  return { type: actionTypes.SET_AUTH_REDIRECT_PATH, path };
};

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      const username = localStorage.getItem("username");
      dispatch(authSuccess(token, userId, username));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};
