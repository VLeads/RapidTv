import { HistoryVideoCard } from "components";
import { useLike } from "context";
import React from "react";
import { Link } from "react-router-dom";
import "./liked.css";

function Liked() {
  const { likes } = useLike();
  const { data, error, isLoading } = likes;

  const authToken = localStorage.getItem("token");

  return (
    <div className="liked_videos_container">
      <div className="page_heading">Liked Videos</div>
      {authToken ? (
        <>
          {isLoading && (
            <div className="empty_list">Loading your liked videos</div>
          )}
          {!isLoading && data.length > 0 ? (
            <div className="liked_videos">
              {data.map((details) => (
                <li key={details._id}>
                  <HistoryVideoCard details={details} type={"fromliked"} />
                </li>
              ))}
            </div>
          ) : (
            <div className="empty_list">You have not liked any video yet </div>
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
          &nbsp; to view liked videos
        </div>
      )}
    </div>
  );
}

export { Liked };
