import axios from "axios";
import { useUser } from "context";
import { useState, useEffect } from "react";

const useApi = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  function getConfig() {
    const config = {
      headers: {
        authorization: token ? token : "",
        "content-type": "application/json",
      },
    };
    return config;
  }

  const httpConfig = "/api";

  function getAllVideosApi() {
    const URL = httpConfig + "/videos";
    return axios.get(URL, getConfig());
  }

  function getVideoApi(id) {
    const URL = httpConfig + "/video/" + id;
    return axios.get(URL, getConfig());
  }

  function getAllCategoriesApi() {
    const URL = httpConfig + "/categories";
    return axios.get(URL, getConfig());
  }

  function getCategoryApi(id) {
    const URL = httpConfig + "/categories/" + id;
    return axios.get(URL, getConfig());
  }

  function getAllLikedVideosApi() {
    const URL = httpConfig + "/user/likes";
    return axios.get(URL, getConfig());
  }

  function postLikedVideoApi(data) {
    const URL = httpConfig + "/user/likes";
    return axios.post(URL, data, getConfig());
  }

  function deleteLikedVideoApi(id) {
    const URL = httpConfig + "/user/likes/" + id;
    return axios.delete(URL, getConfig());
  }

  function getAllWatchLaterApi() {
    const URL = httpConfig + "/user/watchlater/";
    return axios.get(URL, getConfig());
  }

  function postWatchLaterVideoApi(data) {
    const URL = httpConfig + "/user/watchlater/";
    return axios.post(URL, data, getConfig());
  }

  function deleteWatchLaterVideoApi(id) {
    const URL = httpConfig + "/user/watchlater/" + id;
    return axios.delete(URL, getConfig());
  }

  function getAllPlaylistNamesApi() {
    const URL = httpConfig + "/user/playlists";
    return axios.get(URL, getConfig());
  }

  function postPlaylistNameApi(data) {
    const URL = httpConfig + "/user/playlists";
    return axios.post(URL, data, getConfig());
  }

  function deletePlaylistNameApi(id) {
    const URL = httpConfig + "/user/playlists/" + id;
    return axios.delete(URL, getConfig());
  }

  function getPlaylistDataApi(id) {
    const URL = httpConfig + "/user/playlists/" + id;
    return axios.get(URL, getConfig());
  }

  function postPlaylistDataApi(id, data) {
    const URL = httpConfig + "/user/playlists/" + id;
    return axios.post(URL, data, getConfig());
  }

  function deletePlaylistDataApi(playlistId, videoId) {
    const URL = httpConfig + "/user/playlists/" + playlistId + "/" + videoId;
    return axios.delete(URL, getConfig());
  }

  function getHistoryApi() {
    const URL = httpConfig + "/user/history";
    return axios.get(URL, getConfig());
  }

  function postHistoryApi(data) {
    const URL = httpConfig + "/user/history";
    return axios.post(URL, data, getConfig());
  }

  function deleteVideoFromHistoryApi(id) {
    const URL = httpConfig + "/user/history/" + id;
    return axios.delete(URL, getConfig());
  }

  function deleteAllHistoryApi(id) {
    const URL = httpConfig + "/user/history/all";
    return axios.delete(URL, getConfig());
  }

  // Signup
  function postSignUpDetailsApi(data) {
    const URL = httpConfig + "/auth/signup";
    return axios.post(URL, data, getConfig());
  }

  // Login
  function postLoginDetailsApi(data) {
    const URL = httpConfig + "/auth/login";
    return axios.post(URL, data, getConfig());
  }

  const value = {
    postLoginDetailsApi,
    postSignUpDetailsApi,
    getAllVideosApi,
    getVideoApi,
    getAllCategoriesApi,
    getCategoryApi,
    getAllLikedVideosApi,
    postLikedVideoApi,
    deleteLikedVideoApi,
    getAllWatchLaterApi,
    deleteWatchLaterVideoApi,
    getAllPlaylistNamesApi,
    postPlaylistNameApi,
    deletePlaylistNameApi,
    getPlaylistDataApi,
    postPlaylistDataApi,
    deletePlaylistDataApi,
    getHistoryApi,
    postHistoryApi,
    deleteVideoFromHistoryApi,
    deleteAllHistoryApi,
  };

  return value;
};

export { useApi };
