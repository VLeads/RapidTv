import React from "react";
import "./header.css";
import logo from "assets/img/rapidtv-logo.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-logo" to="/">
        <img src={logo} alt="rapid tv logo" />
      </Link>
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
