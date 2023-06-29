import { combineReducers } from "redux";
import postReducer from "./posts/posts.reducer";
import postByReducer from "./posts/posts.user.reducer";
import userReducer from "./user/user.reducer";
export default combineReducers({
  posts: postReducer,
  users: postByReducer,
  isLoggedin: userReducer,
});
