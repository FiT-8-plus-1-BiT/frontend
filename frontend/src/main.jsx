import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import { Provider } from "react-redux";
import store from "~/redux/store";
<<<<<<< HEAD
import "./index.css"; // ✅ Tailwind 스타일 불러오기

=======
>>>>>>> 094f654 (로그인 구글 버튼 UI 통일 & src/ @->~로 변경)

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);