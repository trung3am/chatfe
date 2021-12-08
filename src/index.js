import App from "./App";
import store from "./store/reducer/index";
import ReactDOM from "react-dom";

import React from "react";
import { Provider } from "react-redux";



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
