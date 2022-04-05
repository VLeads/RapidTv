import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

function VideoCard({ details }) {
  const {
    thumbnail,
    title,
    url,
    subscribers,
    channelName,
    avatar,
    description,
    _id,
  } = details;

  return (
    <div className={styles.videoCard}>
      <Link to={`/watch/${_id}`}>
        <div className={styles.cardImageContainer}>
          <img src={thumbnail} alt="thumbnail" loading="lazy" />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.avatar}>
            <img src={avatar} alt="avatar" loading="lazy" />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.channelName}>{channelName}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export { VideoCard };
