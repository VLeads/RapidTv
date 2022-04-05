import { useApi, useAsync } from "custom-hooks";
import { createContext, useContext } from "react";

import { useUser } from "./user-context";
import { useEffect } from "react";
const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  const fetchData = "watchlater";

  const { getAllWatchLaterApi } = useApi();

  const getToken = localStorage.getItem("token");
  const {
    state: watchLater,
    postDataUsingApi,
    deleteDataUsingApi,
  } = useAsync(getAllWatchLaterApi, fetchData, getToken);

  const value = { watchLater, postDataUsingApi, deleteDataUsingApi };
  return (
    <WatchLaterContext.Provider value={value}>
      {children}
    </WatchLaterContext.Provider>
  );
};

const useWatchLater = () => useContext(WatchLaterContext);

export { useWatchLater, WatchLaterProvider };
