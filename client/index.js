import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
      <ToastContainer closeButton={false} position="bottom-right" />
    </Router>
  </Provider>,
  document.getElementById("app")
);
