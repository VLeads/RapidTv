import React from "react";

export const Header = () => {
  return (
    <nav class="navbar">
      <a class="navbar-logo" href="#">
        <img src="../assets/images/rapidstore.png" alt="rapid store" />
      </a>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search" />
      </div>
      <ul class="nav-links">
        <li>
          <a href="#" class="btn btn-primary">
            Login
          </a>
        </li>
        <li>
          <a href="#">
            <span class="badge-icon">
              <span class="badge red">20+</span>
              <i class="far fa-heart"></i>{" "}
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="badge-icon">
              <span class="badge blue">5</span>
              <i class="far fa-shopping-cart"></i>{" "}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
