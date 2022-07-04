import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useApi, useAsync } from "custom-hooks";
import { getAllCategoriesApi } from "utils";
import { useVideo } from "./video-context";

const CategoryContext = createContext(null);

const CategoryProvider = ({ children }) => {
  const [categoryVideos, setCategoryVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { getAllCategoriesApi } = useApi();

  const fetchData = "categories";

  const { state: categories, dispatch: categoriesDispatch } = useAsync(
    getAllCategoriesApi,
    fetchData
  );

  const { videos } = useVideo();

  const categoryHandler = (videoData) => {
    let allVideos = [...videos.data];
    setCategoryVideos(
      allVideos.filter((item) => item.categoryName === videoData.categoryName)
    );
  };

  // ---- search ----
  const searchHandler = (searchInput) => {
    let allVideos = [...videos.data];
    return setCategoryVideos(
      allVideos?.filter((item) =>
        item?.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  console.log("category", categoryVideos);

  const value = {
    categories,
    categoryVideos,
    setCategoryVideos,
    categoriesDispatch,
    categoryHandler,
    searchHandler,
    searchTerm,
    setSearchTerm,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => useContext(CategoryContext);

export { CategoryProvider, useCategory };
