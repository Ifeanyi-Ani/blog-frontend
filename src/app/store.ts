import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/postSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    posts: postSlice,
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
