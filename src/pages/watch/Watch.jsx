import { useEffect, useState } from "react";
import "./watch.css";
import { useParams } from "react-router-dom";
import { VideoEmbed } from "components";
import { useVideo } from "context";
import {
  LikeIcon,
  SaveToPlaylistIcon,
  WatchLaterOutlineIcon,
} from "assets/icons/icons";

function Watch() {
  const { videoId } = useParams();
  const [singleVideo, setSingleVideo] = useState({});

  const { getSingleVideo } = useVideo();

  useEffect(() => {
    getSingleVideo(videoId, setSingleVideo);
  }, []);

  const { title, avatar, channelName, description, subscribers } = singleVideo;

  return (
    <div className="video_page_container">
      <VideoEmbed data={singleVideo} />
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
          <button className="video_action_btn">
            <LikeIcon /> like
          </button>
          <button className="video_action_btn">
            <WatchLaterOutlineIcon />
            watch later
          </button>
          <button className="video_action_btn">
            <SaveToPlaylistIcon />
            save
          </button>
        </div>
      </div>
      <div className="video_description">
        <p>{description}</p>
      </div>
    </div>
  );
}

export { Watch };
