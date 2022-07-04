import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {
  CategoryProvider,
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
        <UserProvider>
          <VideoProvider>
            <CategoryProvider>
              <PlaylistProvider>
                <HistoryProvider>
                  <WatchLaterProvider>
                    <LikeProvider>
                      <App />
                    </LikeProvider>
                  </WatchLaterProvider>
                </HistoryProvider>
              </PlaylistProvider>
            </CategoryProvider>
          </VideoProvider>
        </UserProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
