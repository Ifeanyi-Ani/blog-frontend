import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import persistentReducer from "./redux-persist-config";
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

// const initializeApp = async () => {
//   await store.dispatch(
//     apiSlice.endpoints.refresh.initiate({}, { forceRefetch: true }),
//   );
// };
//
// initializeApp();
// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
