import React, { useEffect } from "react";
import "../history/history.css";
import { HorizontalVideoCard, Modal, Toast } from "components";
import { usePlaylist, useToast, useUser } from "context";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { useApi } from "custom-hooks";
import "./playlist.css";

function Playlist() {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const { getToken: authToken } = useUser();
  const { isModalOpen, setIsModalOpen, setNotShowPlaylistNames } = useToast();
  const { deletePlaylistNameApi } = useApi();

  const { playlist, deleteDataUsingApi } = usePlaylist();
  const { data: playlistData } = playlist;

  const currentPlaylist = playlistData.find((item) => item._id === playlistId);

  const deletePlaylist = () => {
    deleteDataUsingApi(deletePlaylistNameApi, playlistId);
  };

  const createPlaylistHandler = () => {
    if (authToken) {
      setNotShowPlaylistNames(true);

      setIsModalOpen((modal) => ({
        ...modal,
        modalState: true,
      }));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="history_videos_container playlist_container">
      <div className="playlist-sidebar">
        <div className="page_heading playlist_heading">Playlists</div>
        <button
          className="btn btn-primary btn-primary-outline"
          style={{ marginBottom: "2rem" }}
          onClick={createPlaylistHandler}
        >
          Create New Playlist
        </button>

        <ul>
          {playlist?.data.length !== 0 &&
            playlist?.data.map(({ title, _id, videos }) => (
              <Link to={`/playlist/${_id}`} key={_id}>
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
                  {currentPlaylist?.videos.length > 0 ? (
                    currentPlaylist?.videos.map((details) => (
                      <li key={details._id}>
                        <HorizontalVideoCard
                          details={details}
                          extra={currentPlaylist}
                          type={"fromplaylist"}
                        />
                      </li>
                    ))
                  ) : (
                    <div className="empty_list">
                      You have not saved any video to this playlist yet{" "}
                    </div>
                  )}
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
      <Modal />
    </div>
  );
}

export { Playlist };
