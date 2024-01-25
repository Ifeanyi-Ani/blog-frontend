import { configureStore } from "@reduxjs/toolkit";

import postSlice from "../features/posts/postSlice";
import userSlice from "../features/users/userSlice";
import commentSlice from "../features/comments/commentSlice";

export const store = configureStore({
  reducer: {
    posts: postSlice,
    users: userSlice,
    comments: commentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
