import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postReducer from "./posts/posts.reducer";
import postByReducer from "./posts/posts.user.reducer";
import modalsReducer from "./modals/modals.reducer";
import userApiReducer from "./user/user.apiReducer";
import commentReducer from "./comments/comment.reducer";
import likeReducer from "./likes/likes.reducer";
import authReducer from "./user/user.auth.reducer";
import searchReducer from "./search/search.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const rootReducer = combineReducers({
  posts: postReducer,
  users: postByReducer,
  toggleModal: modalsReducer,
  user: userApiReducer,
  auth: authReducer,
  comment: commentReducer,
  like: likeReducer,
  search: searchReducer,
});
export default persistReducer(persistConfig, rootReducer);
