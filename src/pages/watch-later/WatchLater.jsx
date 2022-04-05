import { HistoryVideoCard } from "components";
import { useWatchLater } from "context";
import React from "react";
import { Link } from "react-router-dom";
import "../liked/liked.css";

function WatchLater() {
  const { watchLater } = useWatchLater();
  const { data, error, isLoading } = watchLater;

  const authToken = localStorage.getItem("token");

  return (
    <div className="liked_videos_container">
      <div className="page_heading">Watch Later Videos</div>
      {authToken ? (
        <>
          {isLoading && (
            <div className="empty_list">Loading your Watch Later videos</div>
          )}
          {!isLoading && data.length > 0 ? (
            <div className="liked_videos">
              {data.map((details) => (
                <li key={details._id}>
                  <HistoryVideoCard details={details} type={"fromwatchlater"} />
                </li>
              ))}
            </div>
          ) : (
            <div className="empty_list">
              You have not saved any video to watch later yet{" "}
            </div>
          )}
        </>
      ) : (
        <div className="empty_list">
          <Link
            to="/login"
            style={{
              textDecoration: "underline",
              color: "red",
              paddingRight: "10px",
            }}
          >
            Login
          </Link>
          &nbsp; to view watch later videos
        </div>
      )}
    </div>
  );
}

export { WatchLater };
