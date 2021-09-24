import { ALL_LIKE, DO_LIKE, DO_DISLIKE } from "../actions/type";
const INITIAL_STATE = [];
const likeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_LIKE:
      state.map((i, index) => {
        if (Number(i.quoteid) === Number(action.payload.quoteid)) {
          state.splice(index, 1);
          return;
        }
      });
      state.push(action.payload);
      return [...state];
    case DO_LIKE:
      state.map((i) => {
        if (Number(i.quoteid) === Number(action.payload.quoteid)) {
          i.likedbyme = action.payload.likedbyme;
          i.quotelikes = Number(i.quotelikes + 1);
        }
      });
      return [...state];
    case DO_DISLIKE:
      state.map((i) => {
        if (Number(i.quoteid) === Number(action.payload.quoteid)) {
          i.likedbyme = action.payload.likedbyme;
          i.quotelikes = Number(i.quotelikes - 1);
        }
      });
      return [...state];
    default:
      return [...state];
  }
};
export default likeReducer;
