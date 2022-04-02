import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { sidebarNav } from "data/sidebarNav.data";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar_links">
        {sidebarNav.map((item) => (
          <NavLink
            key={item._id}
            to={item.linkTo}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <li>
              <span className="sidebar-icon">{item.icon}</span>
              {item.linkName}
            </li>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};
