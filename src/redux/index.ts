import { combineReducers } from "redux";
import postReducer from "./posts/posts.reducer";
import postByReducer from "./posts/posts.user.reducer";
import modalsReducer from "./modals/modals.reducer";
import userApiReducer from "./user/user.apiReducer";
export default combineReducers({
  posts: postReducer,
  users: postByReducer,
  toggleModal: modalsReducer,
  user: userApiReducer,
});
