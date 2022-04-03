import React from "react";
import "./header.css";
import logo from "assets/img/rapidtv-logo.png";

export const Header = () => {
  return (
    <nav className="navbar">
      <a className="navbar-logo" href="#">
        <img src={logo} alt="rapid tv logo" />
      </a>
      <div className="navbar-items">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search..."
            className="header-serachbox"
          />
        </div>
        <ul className="nav-links">
          <li>
            <a href="#" className="btn btn-primary">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
