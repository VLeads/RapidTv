import React from "react";
import "./header.css";
import logo from "assets/img/rapidtv-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ACTION_TYPE_SUCCESS } from "utils";
import { useToast, useUser } from "context";
import { Toast } from "components/toast/Toast";
import { SearchIcon } from "assets/icons/icons";

export const Header = () => {
  const navigate = useNavigate();

  const { getToken: authToken, setGetToken } = useUser();
  const { toastDispatch, setShowToast } = useToast();

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

  return (
    <>
      <nav className="navbar">
        <Link className="navbar-logo" to="/">
          <img src={logo} alt="rapid tv logo" />
        </Link>
        <div className="navbar-items">
          <div className="search-box">
            <span className="search-icon">

            <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="header-searchbox"
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
