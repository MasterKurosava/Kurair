import React from "react";
import {render} from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./components/App";

import favicon from "./images/favicons/favicon.png";


render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
)