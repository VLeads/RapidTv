import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import {
  Discover,
  Error404,
  Watch,
  History,
  Trending,
  WatchLater,
  Playlist,
  Signup,
  Login,
  Homepage,
  Liked,
} from "pages";

import { Header } from "./components";
import logo from "./logo.png";
import { CategoryProvider } from "context";
import { RequiresAuth } from "components/auth-route/RequiresAuth";
import { RestrictAuth } from "components/auth-route/RestrictAuth";

function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route index element={<Discover />} />
          <Route path="/trending" element={<Trending />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/watch/:videoId" element={<Watch />}></Route>
          <Route path="/watch-later" element={<WatchLater />}></Route>
          <Route path="/liked" element={<Liked />}></Route>
          <Route element={<RequiresAuth />}>
            <Route path="/playlist/" element={<Playlist />}></Route>
            <Route path="/playlist/:playlistId" element={<Playlist />}></Route>
          </Route>
        </Route>
        <Route element={<RestrictAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
