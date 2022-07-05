import React, { useEffect } from "react";
import "./history.css";
import { HorizontalVideoCard, Modal, Toast } from "components";
import { useCategory, useHistory, useUser } from "context";
import { Link } from "react-router-dom";
import { useApi } from "custom-hooks";

function History() {
  const { history, historyLoading, deleteAllHistory } = useHistory();

  const { getToken: authToken } = useUser();

  const { setSearchTerm } = useCategory();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchTerm("");
  }, []);

  return (
    <div className="history_videos_container">
      <div>
        <div className="page_heading">History</div>
        {authToken && history.length > 0 && (
          <button className=" btn clear_all" onClick={deleteAllHistory}>
            Clear All History
          </button>
        )}
      </div>

      {authToken ? (
        <>
          {historyLoading && (
            <div className="empty_list">Loading your History</div>
          )}
          {!historyLoading && history.length > 0 ? (
            <div className="history_videos">
              {history.map((details) => (
                <li key={details._id}>
                  <HorizontalVideoCard details={details} type={"fromhistory"} />
                </li>
              ))}
            </div>
          ) : (
            <div className="empty_list">
              Your played videos will appear here{" "}
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
            }}
          >
            Login
          </Link>{" "}
          &nbsp; to view your history
        </div>
      )}
      <Toast />
      <Modal />
    </div>
  );
}

export { History };
