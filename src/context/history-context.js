import axios from "axios";
import { useApi, useAsync } from "custom-hooks";
import { createContext, useContext, useState } from "react";
import { ACTION_TYPE_ERROR, ACTION_TYPE_SUCCESS } from "utils";
import { useToast } from "./toast-context";

const HistoryContext = createContext(null);

const HistoryProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const {
    getHistoryApi,
    postHistoryApi,
    deleteVideoFromHistoryApi,
    deleteAllHistoryApi,
  } = useApi();

  const { toastDispatch, setShowToast } = useToast();

  const [history, setHistory] = useState([]);

  const [historyLoading, setHistoryLoading] = useState(false);

  const getAllHistory = () => {
    (async () => {
      try {
        setHistoryLoading(true);
        const response = await getHistoryApi();
        if (response.status === 201) {
          setHistory(response.data.history);
          setHistoryLoading(false);
        }
      } catch (error) {
        setHistoryLoading(false);
        console.log("history", error.message);
      }
    })();
  };

  const addVideoToHistory = (data) => {
    (async () => {
      try {
        setHistoryLoading(true);
        const response = await postHistoryApi({ video: { ...data } });

        if (response.status === 201 || response.status === 200) {
          setHistory(response.data.history);
          setHistoryLoading(false);
        }
      } catch (error) {
        setHistoryLoading(false);
        console.log("history", error.message);
      }
    })();
  };

  const deleteFromHistory = (id) => {
    (async () => {
      try {
        setHistoryLoading(true);
        const response = await deleteVideoFromHistoryApi(id);

        if (response.status === 201 || response.status === 200) {
          setHistory(response.data.history);
          setHistoryLoading(false);
          setShowToast(true);
          toastDispatch({
            type: ACTION_TYPE_SUCCESS,
            payload: "✅ Video removed from history",
          });
          setTimeout(() => {
            setShowToast(false);
          }, 3500);
        }
      } catch (error) {
        setHistoryLoading(false);
        console.log("history", error.message);
        setShowToast(true);
        toastDispatch({
          type: ACTION_TYPE_ERROR,
          payload: "❌ Unable to delete",
        });
        setTimeout(() => {
          setShowToast(false);
        }, 3500);
      }
    })();
  };

  const deleteAllHistory = () => {
    (async () => {
      try {
        setHistoryLoading(true);
        const response = await deleteAllHistoryApi();

        if (response.status === 200 || response.status === 201) {
          setHistoryLoading(false);
          setHistory(response.data.history);
          setShowToast(true);
          toastDispatch({
            type: ACTION_TYPE_SUCCESS,
            payload: "✅ History cleared",
          });
          setTimeout(() => {
            setShowToast(false);
          }, 3500);
        }
      } catch (error) {
        setHistoryLoading(false);
        console.log("history", error.message);
        setShowToast(true);
        toastDispatch({
          type: ACTION_TYPE_ERROR,
          payload: "❌ Unable to delete",
        });
        setTimeout(() => {
          setShowToast(false);
        }, 3500);
      }
    })();
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addVideoToHistory,
        historyLoading,
        deleteAllHistory,
        deleteFromHistory,
        setHistoryLoading,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = () => useContext(HistoryContext);

export { useHistory, HistoryProvider };
