import React from "react";
import "./header.css";
import logo from "assets/img/rapidtv-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ACTION_TYPE_SUCCESS } from "utils";
import { useCategory, useToast, useUser } from "context";
import { Toast } from "components/toast/Toast";
import { SearchIcon } from "assets/icons/icons";

export const Header = () => {
  const navigate = useNavigate();
  const { getToken: authToken, setGetToken } = useUser();
  const { toastDispatch, setShowToast } = useToast();

  const { searchTerm, setSearchTerm, searchHandler } = useCategory();

  const logoutHandler = () => {
    setShowToast(true);
    toastDispatch({
      type: ACTION_TYPE_SUCCESS,
      payload: `✅ Successfully logged out `,
    });
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
    localStorage.removeItem("token");
    setGetToken("");
    navigate("/", { replace: true });
  };

  const searchNavigateHandler = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  // ----- debounce -----
  function debounce(cb, delay) {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  const searchInputHandler = (e) => {
    let val = e.target.value;
    setSearchTerm(val);
    const debounceFunction = debounce(() => searchHandler(val), 1000);
    debounceFunction();
  };

  return (
    <>
      <nav className="navbar">
        <Link className="navbar-logo" to="/">
          <img src={logo} alt="rapid tv logo" />
        </Link>
        <div className="navbar-items">
          <div className="search-box" onClick={searchNavigateHandler}>
            <span className="search-icon">
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="Search videos..."
              className="header-searchbox"
              value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              onChange={searchInputHandler}
            />
          </div>
          <ul className="nav-links">
            <li>
              {authToken ? (
                <button className="btn btn-danger" onClick={logoutHandler}>
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Toast />
    </>
  );
};
