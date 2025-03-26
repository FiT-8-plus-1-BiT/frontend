import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '~/redux/store'; // 경로는 너 구조에 맞게 수정


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate> 
     </Provider>
);