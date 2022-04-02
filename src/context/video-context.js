import { useAsync } from "custom-hooks/useAsync";
import { createContext, useContext, useEffect } from "react";
import { getAllVideosApi } from "utils";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const fetchData = "videos";

  const { state: videos, dispatch: videosDispatch } = useAsync(
    getAllVideosApi,
    fetchData
  );

  const value = { videos, videosDispatch };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { useVideo, VideoProvider };
