import initialState from "../states/login";
import { SET_USER_LOGGED_IN, SET_USER_INFO } from "../actions/actionTypes";

export default function login(state = initialState, action) {
  switch (action.type) {
    case SET_USER_LOGGED_IN:
      return { ...state, isUserLoggedIn: action.payload };
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    default:
      return {
        ...state,
      };
  }
}
