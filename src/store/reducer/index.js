import { ProcessReducer } from "./process";
import {  createStore } from "redux";
const store = createStore(
  ProcessReducer
)

export default store;
