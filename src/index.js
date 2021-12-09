import App from "./App";
import {store, persistor} from "./store/reducer/index";
import ReactDOM from "react-dom";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

window.persistor = persistor

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor= {persistor}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
