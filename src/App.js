import { Discover } from "pages";
import { Homepage } from "pages/homepage/Homepage";
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
        </Route>
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
