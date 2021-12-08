import { ProcessReducer } from "./process";
import {  createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
  ProcessReducer,
  composeWithDevTools()
)

export default store;
