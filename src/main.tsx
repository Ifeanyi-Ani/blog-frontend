import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import ContextProvider from "./contexts/contextData.tsx";
import { store } from "./app/store.ts";

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
