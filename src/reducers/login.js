import initialState from "../states/login";
import { SET_USER_LOGGED_IN } from "../actions/actionTypes";

export default function login(state = initialState, action) {
  console.log("action.type", action.type);
  switch (action.type) {
    case SET_USER_LOGGED_IN:
      return { ...state, isUserLoggedIn: action.payload };
    default:
      return {
        ...state,
      };
  }
}
