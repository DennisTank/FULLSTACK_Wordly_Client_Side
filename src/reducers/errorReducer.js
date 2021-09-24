import { LOGIN_E, SIGNIN_E, AUTH_E } from "../actions/type";
const INITIAL_STATE = {};
const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_E:
      return {
        ...state,
        logInError: action.payload,
      };

    case SIGNIN_E:
      return {
        ...state,
        signInError: action.payload,
      };
    case AUTH_E:
      return {
        ...state,
        signInError: action.payload,
      };

    default:
      return state;
  }
};
export default errorReducer;
