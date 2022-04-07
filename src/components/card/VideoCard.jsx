import React, { useState } from "react";
import styles from "./card.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useHistory, useToast, useUser, useWatchLater } from "context";
import { useApi } from "custom-hooks";
import {
  CheckIcon,
  OptionsIcon,
  PlaylistIcon,
  PlusIcon,
} from "assets/icons/icons";
import { Modal } from "components/modal/Modal";

function VideoCard({ details }) {
  const navigate = useNavigate();

  const { getToken } = useUser();
  const [showVideoMenu, setShowVideoMenu] = useState(false);

  const { isModalOpen, setIsModalOpen } = useToast();

  const {
    watchLater,
    postDataUsingApi: postWatchLater,
    deleteDataUsingApi: deleteWatchLater,
  } = useWatchLater();

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

  const { deleteWatchLaterVideoApi, postWatchLaterVideoApi } = useApi();

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
      setShowVideoMenu(false);
      setIsModalOpen((modal) => ({
        ...modal,
        modalState: true,
        videoData: details,
      }));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.videoCardParent}>
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
      <span
        className={styles.videoMenuBtn}
        onClick={() => setShowVideoMenu((showVideoMenu) => !showVideoMenu)}
        role="button"
      >
        <OptionsIcon />
      </span>
      {showVideoMenu && (
        <ol className={`list ${styles.videoMenuCard}`}>
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
          <li className={styles.videoMenuCardItem} onClick={playlistHandler}>
            <PlaylistIcon /> Save to Playlist
          </li>
        </ol>
      )}
    </div>
  );
}

export { VideoCard };
