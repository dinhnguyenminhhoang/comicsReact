import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "~/Components/GlobalStyle/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </Provider>
);
reportWebVitals();
