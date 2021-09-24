import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import quoteListReducer from "./quoteListReducer";
import atUserReducer from "./atUserReducer";
import likeReducer from "./likeReducer";
import followReducer from "./followReducer";

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  error: errorReducer,
  quoteList: quoteListReducer,
  atUser: atUserReducer,
  likeList: likeReducer,
  follows: followReducer,
});
//starringUser:
export default rootReducer;
