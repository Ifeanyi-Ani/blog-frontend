import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";
import ContextProvider from "./contexts/contextData.tsx";
import { store } from "./app/store.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <App />
        <Toaster position="top-center" />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
);
