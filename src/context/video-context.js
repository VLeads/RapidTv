import axios from "axios";
import { useState } from "react";
import { useApi, useAsync } from "custom-hooks";
import { createContext, useContext, useEffect } from "react";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  // const [singleVideo, setSingleVideo] = useState({});

  const fetchData = "videos";

  const { getAllVideosApi, getVideoApi } = useApi();

  const { state: videos, dispatch: videosDispatch } = useAsync(
    getAllVideosApi,
    fetchData
  );

  const getSingleVideo = async (id, setSingleVideo) => {
    try {
      const response = await getVideoApi(id);
      if (response.status === 200) {
        setSingleVideo(response.data.video);
      }
      console.log("watch", response.data);
    } catch (err) {
      console.log("watch", getVideoApi(id), err.message);
    }
  };

  const value = { videos, videosDispatch, getSingleVideo };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { useVideo, VideoProvider };
