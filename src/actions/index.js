import { wordlyApi, ImageUp } from "../api/wordlyApi";
import History from "../History";
import {
  AUTH,
  AUTH_R,
  SIGNIN,
  LOGIN,
  LOGOUT,
  LOGIN_E,
  SIGNIN_E,
  AUTH_E,
  FETCH_QL,
  FETCH_USER,
  POST_QUOTE,
  DELETE_QUOTE,
  EDIT_USERNAME,
  EDIT_DOB,
  EDIT_BIO,
  CLR_QL,
  CLR_ATUSER,
  ALL_LIKE,
  DO_LIKE,
  DO_DISLIKE,
  FETCH_FOLLOWERS,
  FETCH_FOLLOWINGS,
  REMOVE_FOLLOWER,
  REMOVE_FOLLOWING,
  DO_FOLLOW,
  CHECK_FOLLOW,
} from "./type";
//AUTH
export const auth = (email) => async (dispatch) => {
  const response = await wordlyApi.get(`/auth?email=${email}`);
  if (response.data.error) {
    dispatch(authError_A(response.data.error));
  } else {
    dispatch({ type: AUTH, payload: response.data });
  }
};
export const auth_R = () => (dispatch) => {
  dispatch({ type: AUTH_R });
};
// SIGNIN
export const signIn = (data) => async (dispatch) => {
  delete data.cnfpass;
  const params = new URLSearchParams(data);
  const response = await wordlyApi.post(`/register?${params}`);

  if (response.data.error) {
    dispatch(signInError_A(response.data.error));
  } else {
    dispatch({ type: SIGNIN, payload: response.data });
    History.push("/dashboard");
  }
};

// LOGIN
export const logIn = (data) => async (dispatch) => {
  const params = new URLSearchParams(data);
  const response = await wordlyApi.get(`/login?${params}`);

  if (response.data.error) {
    dispatch(logInError_A(response.data.error));
  } else {
    dispatch({ type: LOGIN, payload: response.data });
    History.push("/dashboard");
  }
};

// LOGOUT
export const logOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLR_QL });
  dispatch({ type: CLR_ATUSER });
  dispatch(signInError_A());
  History.push("/");
};

//ERRORS NO ASYNC
export const authError_A = (data) => (dispatch) => {
  dispatch({ type: AUTH_E, payload: data });
};
export const logInError_A = (data) => (dispatch) => {
  dispatch({ type: LOGIN_E, payload: data });
};
export const signInError_A = (data) => (dispatch) => {
  dispatch({ type: SIGNIN_E, payload: data });
};

//QUOTE LIST
export const fetchQuotes = () => async (dispatch) => {
  const response = await wordlyApi.get("/quotes");
  dispatch({ type: FETCH_QL, payload: response.data });
};

//QUOTE LIST OF USER
export const fetchQuotesOF = (userid) => async (dispatch) => {
  const response = await wordlyApi.get(`/quotes?userid=${userid}`);
  dispatch({ type: FETCH_QL, payload: response.data });
};

// POST QUOTE
export const postQuote = (data) => async (dispatch) => {
  const params = new URLSearchParams(data);
  const response = await wordlyApi.post(`/quote?${params}`);
  if (response.data === "DONE") {
    dispatch({ type: POST_QUOTE });
  }
  History.push("/dashboard");
};

// DELETE QUOTE
export const deleteQuote = (quoteid) => async (dispatch) => {
  const response = await wordlyApi.delete(`/quote?quoteid=${quoteid}`);
  if (response.data === "DONE") {
    dispatch({ type: DELETE_QUOTE, payload: quoteid });
  }
};

// ANY USER
export const fetchUser = (userid) => async (dispatch) => {
  const response = await wordlyApi.get(`/user?userid=${userid}`);
  dispatch({ type: FETCH_USER, payload: response.data });
};

// ALL EDIT/PATCH
export const editUsername = (data) => async (dispatch, getState) => {
  const params = new URLSearchParams({
    ...data,
    userid: getState().user.userid,
  });
  const response = await wordlyApi.patch(`/update_username?${params}`);
  if (response.data.error) {
    dispatch(signInError_A(response.data.error));
  } else {
    dispatch({ type: EDIT_USERNAME, payload: response.data });
  }
};
export const editDOB = (data) => async (dispatch, getState) => {
  const params = new URLSearchParams({
    ...data,
    userid: getState().user.userid,
  });
  const response = await wordlyApi.patch(`/update_dob?${params}`);
  dispatch({ type: EDIT_DOB, payload: response.data });
};
export const editBIO = (data) => async (dispatch, getState) => {
  const params = new URLSearchParams({
    ...data,
    userid: getState().user.userid,
  });
  const response = await wordlyApi.patch(`/update_bio?${params}`);
  dispatch({ type: EDIT_BIO, payload: response.data });
};

export const uploadProfilePic = (file, reset) => async (dispatch, getState) => {
  const formdata = new FormData();
  formdata.append("profile", file);
  const response = await wordlyApi.post(
    `/image?userid=${getState().user.userid}`,
    formdata
  );
  if (response.data === "DONE") {
    reset();
  }
};

// likes
export const allLike = (quoteid) => async (dispatch, getState) => {
  const response = await wordlyApi.get(
    `/likes?quoteid=${quoteid}&userid=${getState().user.userid}`
  );
  const data = { ...response.data, quoteid: quoteid };
  dispatch({ type: ALL_LIKE, payload: { ...response.data, quoteid: quoteid } });
};
export const doLike = (quoteid) => async (dispatch, getState) => {
  const response = await wordlyApi.post(
    `/like?quoteid=${quoteid}&userid=${getState().user.userid}`
  );
  dispatch({ type: DO_LIKE, payload: { ...response.data, quoteid: quoteid } });
};
export const doDislike = (quoteid) => async (dispatch, getState) => {
  const response = await wordlyApi.delete(
    `/like?quoteid=${quoteid}&userid=${getState().user.userid}`
  );
  dispatch({
    type: DO_DISLIKE,
    payload: { ...response.data, quoteid: quoteid },
  });
};

//follows
export const fetchFollowers = (userid) => async (dispatch) => {
  const response = await wordlyApi.get(`/followers?userid=${userid}`);
  dispatch({ type: FETCH_FOLLOWERS, payload: response.data });
};
export const fetchFollowings = (userid) => async (dispatch) => {
  const response = await wordlyApi.get(`/followings?userid=${userid}`);
  dispatch({ type: FETCH_FOLLOWINGS, payload: response.data });
};
export const doFollow = (followingid) => async (dispatch, getState) => {
  const response = await wordlyApi.post(
    `/follow?followerid=${getState().user.userid}&followingid=${followingid}`
  );
  if ((response.data = "DONE")) {
    dispatch({ type: DO_FOLLOW });
  }
};
export const doUnFollow = (followingid) => async (dispatch, getState) => {
  const response = await wordlyApi.delete(
    `/removeFollow?followerid=${
      getState().user.userid
    }&followingid=${followingid}`
  );
  if ((response.data = "DONE")) {
    dispatch({ type: REMOVE_FOLLOWING, payload: { userid: followingid } });
  }
};
export const checkFollow = (followingid) => async (dispatch, getState) => {
  const response = await wordlyApi.get(
    `/follow?followerid=${getState().user.userid}&followingid=${followingid}`
  );
  dispatch({ type: CHECK_FOLLOW, payload: response.data });
};
