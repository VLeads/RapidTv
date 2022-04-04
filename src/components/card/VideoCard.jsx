import React from "react";
import styles from "./card.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useHistory, useUser } from "context";
import { useApi } from "custom-hooks";

function VideoCard({ details }) {
  const navigate = useNavigate();

  const getToken = localStorage.getItem("token");

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

  const { history, addVideoToHistory } = useHistory();

  const handleClick = () => {
    if (getToken) {
      if (!history.some((item) => item?._id === details?._id)) {
        addVideoToHistory(details);
      }
    }
  };

  return (
    <div
      className={styles.videoCard}
      onClick={() => {
        handleClick(details), navigate(`/watch/${_id}`);
      }}
    >
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
    </div>
  );
}

export { VideoCard };
