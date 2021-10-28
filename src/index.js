import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import RAMVisualization from "./components/RAMVisualization";
import * as serviceWorker from "./serviceWorker";

import "./commonStyles/index.scss";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <RAMVisualization />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
