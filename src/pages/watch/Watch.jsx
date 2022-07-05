import { useEffect, useState } from "react";
import "./watch.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Modal } from "components";
import {
  useHistory,
  useLike,
  useToast,
  useUser,
  useVideo,
  useWatchLater,
} from "context";
import {
  LikeIcon,
  SaveToPlaylistIcon,
  WatchLaterOutlineIcon,
} from "assets/icons/icons";
import { useApi } from "custom-hooks";

function Watch() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useUser();

  const [singleVideo, setSingleVideo] = useState({});

  const { getSingleVideo, isLoading, setIsLoading } = useVideo();
  const {
    deleteLikedVideoApi,
    postLikedVideoApi,
    deleteWatchLaterVideoApi,
    postWatchLaterVideoApi,
  } = useApi();

  const { history } = useHistory();

  const { isModalOpen, setIsModalOpen } = useToast();

  const {
    watchLater,
    postDataUsingApi: postWatchLater,
    deleteDataUsingApi: deleteWatchLater,
  } = useWatchLater();

  const {
    likes,
    postDataUsingApi: postLike,
    deleteDataUsingApi: deleteLike,
  } = useLike();
  const { data: likeData, error: likeError, isLoading: likeLoading } = likes;

  useEffect(() => {
    getSingleVideo(videoId, setSingleVideo);
  }, []);

  const { title, avatar, channelName, description, subscribers } = singleVideo;

  const watchLaterClickHandler = () => {
    if (getToken) {
      if (
        watchLater.data.findIndex(
          (element) => element._id === singleVideo._id
        ) !== -1
      ) {
        deleteWatchLater(deleteWatchLaterVideoApi, singleVideo._id);
      } else {
        postWatchLater(postWatchLaterVideoApi, {
          video: { ...singleVideo },
        });
      }
    } else {
      navigate("/login");
    }
  };

  const likeClickHandler = () => {
    if (getToken) {
      if (
        likeData.findIndex((element) => element._id === singleVideo._id) !== -1
      ) {
        deleteLike(deleteLikedVideoApi, singleVideo._id);
      } else {
        postLike(postLikedVideoApi, {
          video: { ...singleVideo },
        });
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
        videoData: singleVideo,
      }));
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="video_page_container">
        {Object.keys(singleVideo).length !== 0 ? (
          <>
            <iframe
              width="1000"
              height="455"
              src={`https://www.youtube.com/embed/${singleVideo?.url}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="embed title"
            />

            <h2 className="video_title">{title}</h2>
            <div className="video_details">
              <div className="channel_info">
                <div className="video_avatar">
                  <img src={avatar} alt="avatar" />
                </div>
                <div className="channel_name">{channelName}</div>

                <div className="subscribers">({subscribers} subscribers)</div>
              </div>
              <div className="video_actions">
                <button className="video_action_btn" onClick={likeClickHandler}>
                  {likeData.some(
                    (element) => element._id === singleVideo._id
                  ) ? (
                    <span className="active-btn">
                      <LikeIcon /> liked
                    </span>
                  ) : (
                    <>
                      <LikeIcon /> like
                    </>
                  )}
                </button>
                <button
                  className="video_action_btn"
                  onClick={watchLaterClickHandler}
                >
                  {watchLater.data.some(
                    (element) => element._id === singleVideo._id
                  ) ? (
                    <span className="active-btn">
                      <WatchLaterOutlineIcon /> watch later
                    </span>
                  ) : (
                    <>
                      <WatchLaterOutlineIcon /> watch later
                    </>
                  )}
                </button>
                <button className="video_action_btn" onClick={playlistHandler}>
                  <SaveToPlaylistIcon />
                  save
                </button>
              </div>
            </div>
            <div className="video_description">
              <p>{description}</p>
            </div>
          </>
        ) : (
          <div className="not-available">
            <p>This video is no longer available</p>

            <Link to="/">
              <button className="btn btn-info not-available-btn ">
                GO BACK TO HOMEPAGE
              </button>
            </Link>
          </div>
        )}
      </div>
      <Modal />
    </>
  );
}

export { Watch };
