import axios from "axios";

const token = localStorage.getItem("token");

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

export function getAllVideosApi() {
  const URL = httpConfig + "/videos";
  return axios.get(URL, getConfig());
}

export function getVideoApi(id) {
  const URL = httpConfig + "/video/" + id;
  return axios.get(URL, getConfig());
}

export function getAllCategoriesApi() {
  const URL = httpConfig + "/categories";
  return axios.get(URL, getConfig());
}

export function getCategoryApi(id) {
  const URL = httpConfig + "/categories/" + id;
  return axios.get(URL, getConfig());
}

export function getAllLikedVideosApi() {
  const URL = httpConfig + "/user/likes";
  return axios.get(URL, getConfig());
}

export function postLikedVideoApi(data) {
  const URL = httpConfig + "/user/likes";
  return axios.post(URL, data, getConfig());
}

export function deleteLikedVideoApi(id) {
  const URL = httpConfig + "/user/likes/" + id;
  return axios.delete(URL, getConfig());
}

export function getAllWatchLaterApi() {
  const URL = httpConfig + "/user/watchlater/";
  return axios.get(URL, getConfig());
}

export function postWatchLaterVideoApi(data) {
  const URL = httpConfig + "/user/watchlater/";
  return axios.post(URL, data, getConfig());
}

export function deleteWatchLaterVideoApi(id) {
  const URL = httpConfig + "/user/watchlater/" + id;
  return axios.delete(URL, getConfig());
}

export function getAllPlaylistNamesApi() {
  const URL = httpConfig + "/user/playlists";
  return axios.get(URL, getConfig());
}

export function postPlaylistNameApi(data) {
  const URL = httpConfig + "/user/playlists";
  return axios.post(URL, data, getConfig());
}

export function deletePlaylistNameApi(id) {
  const URL = httpConfig + "/user/playlists/" + id;
  return axios.delete(URL, getConfig());
}

export function getPlaylistDataApi(id) {
  const URL = httpConfig + "/user/playlists/" + id;
  return axios.get(URL, getConfig());
}

export function postPlaylistDataApi(id, data) {
  const URL = httpConfig + "/user/playlists/" + id;
  return axios.post(URL, data, getConfig());
}

export function deletePlaylistDataApi(playlistId, videoId) {
  const URL = httpConfig + "/user/playlists/" + playlistId + "/" + videoId;
  return axios.delete(URL, getConfig());
}

export function getHistoryApi() {
  const URL = httpConfig + "/user/history";
  return axios.get(URL, getConfig());
}

export function postHistoryApi(data) {
  const URL = httpConfig + "/user/history";
  return axios.post(URL, data, getConfig());
}

export function deleteVideoFromHistoryApi(id) {
  const URL = httpConfig + "/user/history/" + id;
  return axios.delete(URL, getConfig());
}

export function deleteAllHistoryApi(id) {
  const URL = httpConfig + "/user/history/all";
  return axios.delete(URL, getConfig());
}
