import { SET_USER_LOGGED_IN, SET_USER_INFO } from "./actionTypes";

export const setUserLoggedIn = (value, userData, token) => (dispatch) => {
  if (userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
  if (token) {
    localStorage.setItem("userToken", token);
  }
  dispatch({
    type: SET_USER_LOGGED_IN,
    payload: value,
  });
  dispatch({
    type: SET_USER_INFO,
    payload: userData,
  });
};

export const getCurrentUserToken = localStorage.getItem("userToken") || null;

export const logout = () => (dispatch) => {
  dispatch({
    type: SET_USER_LOGGED_IN,
    payload: false,
  });

  localStorage.clear();
};
