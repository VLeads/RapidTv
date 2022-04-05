import { Discover, Watch } from "pages";
import { Homepage } from "pages/homepage/Homepage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import logo from "./logo.png";
import Mockman from "mockman-js";
import { CategoryProvider } from "context";
import { Login } from "pages/auth/Login";
import { Signup } from "pages/auth/Signup";
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
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
