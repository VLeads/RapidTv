import { HorizontalVideoCard } from "components";
import { useLike, useUser } from "context";
import React from "react";
import { Link } from "react-router-dom";
import "./liked.css";

function Liked() {
  const { likes } = useLike();
  const { data, error, isLoading } = likes;

  const { getToken: authToken } = useUser();

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
                  <HorizontalVideoCard details={details} type={"fromliked"} />
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
