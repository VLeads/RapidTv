import React from "react";
import styles from "./homepage.module.css";
import { Sidebar } from "components";
import { Outlet } from "react-router";

export const Homepage = () => {
  return (
    <main className={styles.homepage_main}>
      <Sidebar />
      <section className={styles.container}>
        <Outlet />
      </section>
    </main>
  );
};
