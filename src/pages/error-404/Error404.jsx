import React from "react";
import { useNavigate } from "react-router";
import styles from "./error.module.css";

export function Error404() {
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.error}>
        OOPS ! seems like you have come to wrong page !!
      </div>
      <img src="https://indianmemetemplates.com/wp-content/uploads/Bhai-kya-kar-raha-hai-tu-1024x711.jpg" />
      <button className={styles.goBack} onClick={() => navigate("/")}>
        GO TO HOMEPAGE
      </button>
    </div>
  );
}
