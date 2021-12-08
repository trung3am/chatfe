import { combineReducers } from "redux";
import { ProcessReducer } from "./process";
import { userReducer } from "./user";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const combined = combineReducers({
    user: userReducer,
    process: ProcessReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['x']
  }
  
  export  const persistedReducer = persistReducer(persistConfig, combined)