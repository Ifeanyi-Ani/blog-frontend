import { combineReducers } from "redux";
import postReducer from "./posts/posts.reducer";
import postByReducer from "./posts/posts.user.reducer";
import modalsReducer from "./modals/modals.reducer";
import userReducer from "./user/user.reducer";
import userApiReducer from "./user/user.apiReducer";
export default combineReducers({
  posts: postReducer,
  users: postByReducer,
  isLoggedin: userReducer,
  toggleModal: modalsReducer,
  user: userApiReducer,
});
