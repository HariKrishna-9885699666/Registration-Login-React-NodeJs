import { SET_USER_LOGGED_IN } from "./actionTypes";

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
};

export const getCurrentUserToken = localStorage.getItem("userToken") || null;

export const getCurrentUserData = localStorage.getItem("user") || null;

export const logout = () => (dispatch) => {
  dispatch({
    type: SET_USER_LOGGED_IN,
    payload: false,
  });

  localStorage.clear();
};
