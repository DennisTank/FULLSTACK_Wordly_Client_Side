import {
  FETCH_QL,
  POST_QUOTE,
  DELETE_QUOTE,
  CLR_QL,
  DO_LIKE,
  DO_DISLIKE,
  ALL_LIKE,
} from "../actions/type";
const INITIAL_STATE = [];
const quoteListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_QL:
      action.payload.sort(function (a, b) {
        return b.quoteid - a.quoteid;
      });
      return action.payload;
    case POST_QUOTE:
      return [...state];
    case DELETE_QUOTE:
      state.map((i, index) => {
        if (Number(i.quoteid) === Number(action.payload)) {
          state.splice(index, 1);
        }
        return null;
      });
      state.sort(function (a, b) {
        return b.quoteid - a.quoteid;
      });
      return [...state];
    case CLR_QL:
      return [];
    default:
      return [...state];
  }
};
export default quoteListReducer;
