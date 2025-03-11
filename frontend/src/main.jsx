import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import { Provider } from "react-redux";
import store from "~/redux/store";
import "./index.css"; // ✅ Tailwind 스타일 불러오기


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);