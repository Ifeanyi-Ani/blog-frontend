import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import reducers from "./redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import App from "./App.tsx";
import "./index.css";
const middlewares = [thunk, logger];
const store = createStore(reducers, applyMiddleware(...middlewares));
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
