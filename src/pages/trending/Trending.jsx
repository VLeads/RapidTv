import React, { useEffect } from "react";
import banner from "assets/img/Rapidtv-poster.png";
import "../discover/discover.css";
import { useCategory, useVideo } from "context";
import { Modal, VideoCard } from "components";

export const Trending = () => {
  const { videos } = useVideo();

  return (
    <div>
      <div className="page_heading">Trending Videos</div>
      <div className="all_videos_container">
        {videos.data.map((details) => (
          <li key={details._id}>
            <VideoCard details={details} />
          </li>
        ))}
      </div>
      <Modal />
    </div>
  );
};
