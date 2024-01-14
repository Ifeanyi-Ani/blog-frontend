import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/postSlice";

export const store = configureStore({
  reducer: {
    posts: postSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
