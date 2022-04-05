import React from "react";
import styles from "./videoEmbed.module.css";

export function VideoEmbed({ data }) {
  const { title, url } = data;

  return (
    <div className={styles.container}>
      <iframe
        width="1000"
        height="455"
        src={`https://www.youtube.com/embed/${url}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="embed title"
      />
    </div>
  );
}
