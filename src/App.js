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

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import logo from "./logo.png";
import Mockman from "mockman-js";
import { CategoryProvider } from "context";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route
            index
            element={
              <CategoryProvider>
                <Discover />{" "}
              </CategoryProvider>
            }
          />
          <Route path="/watch/:videoId" element={<Watch />}></Route>
          <Route path="/liked" element={<Liked />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/trending" element={<Trending />}></Route>
          <Route path="/watch-later" element={<WatchLater />}></Route>
          <Route path="/playlist/" element={<Playlist />}></Route>
          <Route path="/playlist/:playlistId" element={<Playlist />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
