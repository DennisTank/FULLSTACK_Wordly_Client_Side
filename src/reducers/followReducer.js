import {
  FETCH_FOLLOWERS,
  FETCH_FOLLOWINGS,
  REMOVE_FOLLOWER,
  REMOVE_FOLLOWING,
  DO_FOLLOW,
} from "../actions/type";
const INITIAL_STATE = {
  followers: [],
  followings: [],
};
const followReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FOLLOWERS:
      return { ...state, followers: action.payload };
    case FETCH_FOLLOWINGS:
      return { ...state, following: action.payload };
    case REMOVE_FOLLOWER:
      state.followers.map((i, index) => {
        if (Number(i.userid) === Number(action.payload.userid)) {
          state.followers.splice(index, 1);
          return;
        }
      });
      return { ...state };
    case REMOVE_FOLLOWING:
      state.followings.map((i, index) => {
        if (Number(i.userid) === Number(action.payload.userid)) {
          state.followers.splice(index, 1);
          return;
        }
      });
      return { ...state };
    case DO_FOLLOW:
      return { ...state };
    default:
      return { ...state };
  }
};
export default followReducer;
