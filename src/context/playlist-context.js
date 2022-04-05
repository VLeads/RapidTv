import axios from "axios";
import { useApi, useAsync } from "custom-hooks";
import { createContext, useContext } from "react";
import {
  ACTION_TYPE_ADD_VIDEO_TO_PLAYLIST,
  ACTION_TYPE_ERROR,
  ACTION_TYPE_REMOVE_VIDEO_FROM_PLAYLIST,
  ACTION_TYPE_SUCCESS,
} from "utils";
import { useToast } from "./toast-context";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const fetchData = "playlists";

  const { getAllPlaylistNamesApi, postPlaylistDataApi, deletePlaylistDataApi } =
    useApi();
    
  const { toastState, toastDispatch, showToast, setShowToast } = useToast();

  const getToken = localStorage.getItem("token");

  const {
    state: playlist,
    dispatch,
    postDataUsingApi,
    deleteDataUsingApi,
  } = useAsync(getAllPlaylistNamesApi, fetchData, getToken);

  const addToPlaylistHandler = async (data, _id, title) => {
    const token = localStorage.getItem("token");

    try {
      const response = await postPlaylistDataApi(_id, { video: { ...data } });

      dispatch({
        type: ACTION_TYPE_ADD_VIDEO_TO_PLAYLIST,
        payload: response.data.playlist,
      });

      toastDispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: `Added in "${title}" playlist`,
      });

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (error) {
      console.log("playlist", error.message);
      toastDispatch({
        type: ACTION_TYPE_ERROR,
        payload: error.message,
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3500);
    }
  };

  const deleteFromPlaylistHandler = async (playlistId, videoId, title) => {
    const token = localStorage.getItem("token");

    try {
      const response = await deletePlaylistDataApi(playlistId, videoId);

      dispatch({
        type: ACTION_TYPE_REMOVE_VIDEO_FROM_PLAYLIST,
        payload: response.data.playlist,
      });

      toastDispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: `Removed from "${title}" playlist`,
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (error) {
      console.log("playlist", error.message);
      toastDispatch({
        type: ACTION_TYPE_ERROR,
        payload: error.message,
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    }
  };

  const value = {
    playlist,
    postDataUsingApi,
    deleteDataUsingApi,
    deleteFromPlaylistHandler,
    addToPlaylistHandler,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlaylistProvider };

// postDataUsingApi - for post playlist name
// deleteDataUsingApi - to delete playlist name
// deleteFromPlaylistHandler - to delete video from playlist
// addToPlaylistHandler -  to add video to playlist
