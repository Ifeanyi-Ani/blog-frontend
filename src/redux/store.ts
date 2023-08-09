import { applyMiddleware, legacy_createStore as createStore } from "redux";
import reducers from "./index";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { persistStore } from "redux-persist";
const middlewares = [thunk];
export const store = createStore(reducers, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
export default { store, persistor };
