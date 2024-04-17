import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

import authSlice from "../features/users/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refresh.initiate({}, { forceRefetch: true }),
  );
};

initializeApp();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
