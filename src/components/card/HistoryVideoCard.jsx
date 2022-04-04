import React from "react";
import styles from "./card.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useHistory, useLike, useUser, useWatchLater } from "context";
import { DeleteIcon } from "assets/icons/icons";
import { useApi } from "custom-hooks";

function HistoryVideoCard({ details, type }) {
  const navigate = useNavigate();
  const { getToken } = useUser();
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

  const { deleteLikedVideoApi, deleteWatchLaterVideoApi } = useApi();

  const { postHistoryApi } = useApi();
  const { history, deleteFromHistory } = useHistory();

  const { deleteDataUsingApi: deleteWatchLater } = useWatchLater();
  const { deleteDataUsingApi: deleteLike } = useLike();

  const onClickHandler = () => {
    if (type === "fromhistory") {
      deleteFromHistory(_id);
    } else if (type === "fromwatchlater") {
      deleteWatchLater(deleteWatchLaterVideoApi, _id);
    } else if (type === "fromliked") {
      deleteLike(deleteLikedVideoApi, _id);
    }
  };

  return (
    <div className={styles.historyVideoCard}>
      <div className={styles.historyCardContainer}>
        <div className={styles.historyCardImageContainer}>
          <img src={thumbnail} alt="thumbnail" loading="lazy" />
        </div>
        <div className={styles.historyCardBody}>
          <div className={styles.historyCardAvatar}>
            <img src={avatar} alt="avatar" loading="lazy" />
            <div className={styles.historyCardChannelName}>{channelName}</div>
          </div>
          <div className={styles.historyCardContent}>{title}</div>
          <div className={styles.cardSubscribers}>
            {subscribers} subscribers
          </div>
        </div>
      </div>
      <div className={styles.historyCardAction}>
        <span className={styles.deleteIcon} onClick={onClickHandler}>
          <DeleteIcon />
        </span>
      </div>
    </div>
  );
}

export { HistoryVideoCard };
