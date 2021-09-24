import { FETCH_USER, CLR_ATUSER, CHECK_FOLLOW } from "../actions/type";
const INITIAL_STATE = {
  userdata: {},
  doIFollow: null,
};
const atUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, userdata: action.payload };
    case CHECK_FOLLOW:
      return { ...state, doIFollow: action.payload };
    case CLR_ATUSER:
      return {};
    default:
      return state;
  }
};
export default atUserReducer;
