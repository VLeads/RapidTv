import { usePlaylist, useToast, useVideo } from "context";
import { useApi } from "custom-hooks";
import React, { useState } from "react";
import { ACTION_TYPE_ERROR } from "utils";
import "./modal.css";

export function Modal() {
  const [inputText, setInputText] = useState("");

  const {
    isModalOpen: { modalState, videoData },
    setIsModalOpen,
    notShowPlaylistNames,
  } = useToast();

  const { videos } = useVideo();

  const { postPlaylistNameApi } = useApi();

  const { toastDispatch, showToast, setShowToast } = useToast();
  const {
    playlist,
    postDataUsingApi,
    deleteDataUsingApi,
    deleteFromPlaylistHandler,
    addToPlaylistHandler,
  } = usePlaylist();

  const closeBtnHandler = () => {
    setIsModalOpen((modal) => ({ ...modal, modalState: false }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputText === "") {
      toastDispatch({
        type: ACTION_TYPE_ERROR,
        payload: "Please enter playlist name",
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } else {
      postDataUsingApi(postPlaylistNameApi, {
        playlist: { title: inputText },
      });
      setInputText("");
    }
  };

  return (
    <div
      id="myModal"
      className="modal"
      style={modalState ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-content box-shadow">
        <div className="modal-header">
          <h4>My Playlists</h4>
          <div className="close-icon" onClick={closeBtnHandler}>
            &times;
          </div>
        </div>
        <div className="modal-body">
          {playlist?.data.length > 0 &&
            !notShowPlaylistNames &&
            playlist?.data.map((item) => (
              <div key={item._id}>
                <label className="playlist_label">
                  <input
                    type="checkbox"
                    id={item.title}
                    checked={item?.videos.some(
                      ({ _id }) => _id === videoData._id
                    )}
                    onChange={() => {
                      item?.videos.some(({ _id }) => _id === videoData._id)
                        ? deleteFromPlaylistHandler(
                            item._id,
                            videoData._id,
                            item.title
                          )
                        : addToPlaylistHandler(videoData, item._id, item.title);
                    }}
                  />{" "}
                  {item.title}
                </label>
              </div>
            ))}

          <form onSubmit={(e) => submitHandler(e)}>
            <label>
              Name:
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={25}
              />
            </label>
            <button className="btn btn-primary create-btn" type="submit">
              Create Playlist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
