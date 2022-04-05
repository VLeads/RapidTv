import React, { useEffect } from "react";
import "../history/history.css";
import { HistoryVideoCard, Toast } from "components";
import { usePlaylist } from "context";
import { Link, NavLink, useParams } from "react-router-dom";
import { useApi } from "custom-hooks";
import "./playlist.css";

function Playlist() {
  const { playlistId } = useParams();

  const authToken = localStorage.getItem("token");

  const { playlist, deleteDataUsingApi } = usePlaylist();
  const { data: playlistData } = playlist;

  const { deletePlaylistNameApi } = useApi();

  const currentPlaylist = playlistData.find((item) => item._id === playlistId);

  console.log("current", playlist, currentPlaylist);

  const deletePlaylist = () => {
    deleteDataUsingApi(deletePlaylistNameApi, playlistId);
  };

  return (
    <div className="history_videos_container playlist_container">
      <div className="playlist-sidebar">
        <div className="page_heading playlist_heading">Playlists</div>

        <ul>
          {playlist?.data.length !== 0 &&
            playlist?.data.map(({ title, _id, videos }) => (
              <Link to={`/playlist/${_id}`}>
                <li
                  className={`playlist-sidebar-nav ${
                    _id === playlistId ? "active-playlist-link" : ""
                  }`}
                  key={_id}
                >
                  {title}
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <div className="playlist_main">
        {authToken ? (
          <>
            {playlistId === undefined && (
              <div className="empty_list playlist_empty">
                Select Playlist from left to see all saved videos
              </div>
            )}
            {currentPlaylist && (
              <>
                <div className="heading_with_btn">
                  <div className="page_heading selected_playlist-heaading">
                    {currentPlaylist.title}
                  </div>
                  {currentPlaylist && (
                    <button className=" btn clear_all" onClick={deletePlaylist}>
                      Delete this Playlist
                    </button>
                  )}
                </div>
                <div className="history_videos">
                  {currentPlaylist?.videos.map((details) => (
                    <li key={details._id}>
                      <HistoryVideoCard
                        details={details}
                        extra={currentPlaylist}
                        type={"fromplaylist"}
                      />
                    </li>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="empty_list">
            <Link
              to="/login"
              style={{
                textDecoration: "underline",
                color: "red",
              }}
            >
              Login
            </Link>{" "}
            &nbsp; to view your playlist
          </div>
        )}
      </div>
      <Toast />
    </div>
  );
}

export { Playlist };
