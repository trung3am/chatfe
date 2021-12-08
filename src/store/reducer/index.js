
import {  createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./combined";
export const store = createStore(
  persistedReducer,
  composeWithDevTools()
)

export const persistor = persistStore(store);
