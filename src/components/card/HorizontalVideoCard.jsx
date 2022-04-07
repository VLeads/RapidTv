import React, { useState } from "react";
import styles from "./card.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  useHistory,
  useLike,
  usePlaylist,
  useToast,
  useUser,
  useWatchLater,
} from "context";
import {
  CheckIcon,
  DeleteIcon,
  OptionsIcon,
  PlaylistIcon,
  PlusIcon,
} from "assets/icons/icons";
import { useApi } from "custom-hooks";

function HorizontalVideoCard({ details, extra, type }) {
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

  const [showVideoMenu, setShowVideoMenu] = useState(false);
  const { isModalOpen, setIsModalOpen } = useToast();

  const { deleteLikedVideoApi, deleteWatchLaterVideoApi } = useApi();

  const { postHistoryApi, postWatchLaterVideoApi } = useApi();
  const { history, deleteFromHistory } = useHistory();

  const {
    watchLater,
    postDataUsingApi: postWatchLater,
    deleteDataUsingApi: deleteWatchLater,
  } = useWatchLater();

  const { deleteDataUsingApi: deleteLike } = useLike();

  const { deleteFromPlaylistHandler, playlist } = usePlaylist();

  const onClickHandler = () => {
    if (type === "fromhistory") {
      deleteFromHistory(_id);
    } else if (type === "fromwatchlater") {
      deleteWatchLater(deleteWatchLaterVideoApi, _id);
    } else if (type === "fromliked") {
      deleteLike(deleteLikedVideoApi, _id);
    } else if (type === "fromplaylist") {
      deleteFromPlaylistHandler(extra._id, details._id, extra.title);
    }
  };

  const watchLaterClickHandler = () => {
    if (getToken) {
      if (watchLater.data.findIndex((element) => element._id === _id) !== -1) {
        deleteWatchLater(deleteWatchLaterVideoApi, _id);
        setShowVideoMenu(false);
      } else {
        postWatchLater(postWatchLaterVideoApi, {
          video: { ...details },
        });
        setShowVideoMenu(false);
      }
    } else {
      navigate("/login");
    }
  };

  const playlistHandler = () => {
    if (getToken) {
      setIsModalOpen((modal) => ({
        ...modal,
        modalState: true,
        videoData: details,
      }));
      setShowVideoMenu(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.videoCardParent}>
      <div className={styles.historyVideoCard}>
        <div
          className={styles.historyCardContainer}
          onClick={() => navigate(`/watch/${_id}`)}
        >
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
          <span
            className={styles.horizontalVideoMenuBtn}
            onClick={() => setShowVideoMenu((showVideoMenu) => !showVideoMenu)}
            role="button"
          >
            <OptionsIcon />
          </span>
          {showVideoMenu && (
            <ol className={`list ${styles.horizontalVideoMenuCard}`}>
              <li
                className={styles.videoMenuCardItem}
                onClick={watchLaterClickHandler}
              >
                {watchLater.data.some((element) => element._id === _id) ? (
                  <>
                    <CheckIcon /> Remove from Watch later
                  </>
                ) : (
                  <>
                    <PlusIcon /> Add to Watch later
                  </>
                )}
              </li>
              <li
                className={styles.videoMenuCardItem}
                onClick={playlistHandler}
              >
                <PlaylistIcon /> Save to Playlist
              </li>
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

export { HorizontalVideoCard };
