import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

import postSlice from "../features/posts/postSlice";
import userSlice from "../features/users/userSlice";
import commentSlice from "../features/comments/commentSlice";
import authSlice from "../features/users/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    posts: postSlice,
    users: userSlice,
    comments: commentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refresh.initiate({}, { forceRefetch: true }),
  );
  await store.dispatch(
    apiSlice.endpoints.getLoggedUser.initiate({}, { forceRefetch: true }),
  );
};

initializeApp();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
