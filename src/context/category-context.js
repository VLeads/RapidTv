import { useApi, useAsync } from "custom-hooks";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllCategoriesApi } from "utils";
import { useVideo } from "./video-context";

const CategoryContext = createContext(null);

const CategoryProvider = ({ children }) => {
  const [categoryVideos, setCategoryVideos] = useState([]);

  const {getAllCategoriesApi} = useApi();

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

  const value = {
    categories,
    categoryVideos,
    setCategoryVideos,
    categoriesDispatch,
    categoryHandler,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => useContext(CategoryContext);

export { CategoryProvider, useCategory };
