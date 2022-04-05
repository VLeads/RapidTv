import React, { useEffect, useReducer } from "react";
import { useToast } from "context";

import {
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  ACTION_TYPE_ADD_VIDEO_TO_PLAYLIST,
  ACTION_TYPE_REMOVE_VIDEO_FROM_PLAYLIST,
} from "utils";

export const useAsync = (api, fetchData, token) => {
  const { toastState, toastDispatch, showToast, setShowToast } = useToast();

  const updatePlaylist = (state, playlist) => {
    if (state.length !== 0) {
      const index = state.findIndex((obj) => obj._id === playlist._id);
      state[index] = playlist;
      return [...state];
    } else {
      return [playlist];
    }
  };

  const [state, dispatch] = useReducer(
    function (state, action) {
      switch (action.type) {
        case ACTION_TYPE_LOADING:
          return { ...state, isLoading: true };

        case ACTION_TYPE_SUCCESS:
          return { ...state, isLoading: false, data: action.payload };
        case ACTION_TYPE_ADD_VIDEO_TO_PLAYLIST:
          return {
            ...state,
            isLoading: false,
            data: updatePlaylist([...state.data], action.payload),
          };
        case ACTION_TYPE_REMOVE_VIDEO_FROM_PLAYLIST:
          return {
            ...state,
            isLoading: false,
            data: updatePlaylist([...state.data], action.payload),
          };
        case ACTION_TYPE_ERROR:
          return { ...state, isLoading: false, error: action.payload };

        default:
          return state;
      }
    },
    {
      data: [],
      error: "",
      isLoading: true,
    }
  );

  useEffect(() => {
    (async () => {
      dispatch({ type: ACTION_TYPE_LOADING });
      try {
        const response = await api();

        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: response.data[fetchData],
        });
      } catch (error) {
        dispatch({
          type: ACTION_TYPE_ERROR,
          payload: error?.message,
        });
      }
    })();
  }, []);

  const postDataUsingApi = async (api, data) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await api(data);

      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: response.data[fetchData],
      });

      setShowToast(true);
      toastDispatch({
        type: ACTION_TYPE_SUCCESS,
        payload:
          fetchData === "likes"
            ? "Added to liked 🎉"
            : fetchData === "watchlater"
            ? "Added to watch later 🎉"
            : "Playlist created 🎉",
      });
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload: error.response,
      });
      console.log("Er", error.message);

      toastDispatch({
        type: ACTION_TYPE_ERROR,
        payload: error?.message,
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const deleteDataUsingApi = async (api, id) => {
    dispatch({
      type: ACTION_TYPE_LOADING,
    });

    try {
      const response = await api(id);

      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: response.data[fetchData],
      });

      setShowToast(true);
      toastDispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: `${
          fetchData === "likes"
            ? "✅ Removed from liked videos "
            : fetchData === "watchlater"
            ? "✅ Removed from watch later"
            : "✅ playlist deleted"
        }`,
      });
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload: error.message,
      });

      toastDispatch({
        type: ACTION_TYPE_ERROR,
        payload: error.message,
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return {
    state,
    dispatch,
    postDataUsingApi,
    deleteDataUsingApi,
  };
};
