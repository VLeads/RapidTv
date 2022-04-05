import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {
  HistoryProvider,
  LikeProvider,
  PlaylistProvider,
  ToastProvider,
  UserProvider,
  VideoProvider,
  WatchLaterProvider,
} from "context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <VideoProvider>
          <PlaylistProvider>
            <HistoryProvider>
              <WatchLaterProvider>
                <LikeProvider>
                  <UserProvider>
                    <App />
                  </UserProvider>
                </LikeProvider>
              </WatchLaterProvider>
            </HistoryProvider>
          </PlaylistProvider>
        </VideoProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
