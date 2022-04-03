import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { sidebarNav } from "data/sidebarNav.data";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from "assets/icons/icons";

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
              <span>{item.icon}</span>
              {item.linkName}
            </li>
          </NavLink>
        ))}
      </ul>
      <ul className="personal_links">
        <li>
          <a href="https://github.com/vleads" target="_blank">
            <GithubIcon />
          </a>
        </li>
        <li>
          <a href="linkedin.com/in/vishalkumar28/" target="_blank">
            <LinkedinIcon />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/vishalk01234" target="_blank">
            <TwitterIcon />
          </a>
        </li>
        <li>
          <a href="mailto:leader.vishalkumar@gmail.com" target="_blank">
            <MailIcon />
          </a>
        </li>
      </ul>
    </aside>
  );
};
