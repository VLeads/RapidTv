import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {
  LikeProvider,
  ToastProvider,
  UserProvider,
  VideoProvider,
} from "context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoProvider>
        <ToastProvider>
          <LikeProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </LikeProvider>
        </ToastProvider>
      </VideoProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
