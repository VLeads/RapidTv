import { useApi, useAsync } from "custom-hooks";
import { createContext, useContext } from "react";

import { useUser } from "./user-context";
import { useEffect } from "react";
const LikeContext = createContext();

const LikeProvider = ({ children }) => {
  const fetchData = "likes";

  const { getAllLikedVideosApi } = useApi();

  const { getToken } = useUser();

  const {
    state: likes,
    postDataUsingApi,
    deleteDataUsingApi,
  } = useAsync(getAllLikedVideosApi, fetchData, getToken);

  const value = { likes, postDataUsingApi, deleteDataUsingApi };
  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};

const useLike = () => useContext(LikeContext);

export { useLike, LikeProvider };
