import {
  AUTH,
  AUTH_R,
  SIGNIN,
  LOGIN,
  LOGOUT,
  EDIT_USERNAME,
  EDIT_BIO,
  EDIT_DOB,
} from "../actions/type";
const INITIAL_STATE = {
  auth: {
    email: null,
    otp: null,
  },
  isLoggedin: null,
  userid: null,
  username: null,
  dob: null,
  email: null,
  bio: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        auth: {
          email: action.payload.email,
          otp: action.payload.otp,
        },
      };
    case AUTH_R:
      return {
        ...state,
        auth: {
          email: null,
          otp: null,
        },
      };
    case SIGNIN:
      return {
        ...state,
        isLoggedin: action.payload.isLoggedin,
        userid: action.payload.userid,
        username: action.payload.username,
        dob: action.payload.dob,
        email: action.payload.email,
        bio: action.payload.bio,
      };
    case LOGIN:
      return {
        ...state,
        isLoggedin: action.payload.isLoggedin,
        userid: action.payload.userid,
        username: action.payload.username,
        dob: action.payload.dob,
        email: action.payload.email,
        bio: action.payload.bio,
      };
    case EDIT_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      };
    case EDIT_DOB:
      return {
        ...state,
        dob: action.payload.dob,
      };
    case EDIT_BIO:
      return {
        ...state,
        bio: action.payload.bio,
      };
    case LOGOUT:
      return {};
    default:
      return { ...state };
  }
};
export default userReducer;
