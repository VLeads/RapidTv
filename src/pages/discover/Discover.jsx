import React, { useEffect } from "react";
import banner from "assets/img/Rapidtv-poster.png";
import "./discover.css";
import { useCategory, useVideo } from "context";
import { VideoCard } from "components";

export const Discover = () => {
  const { videos } = useVideo();
  const { categories, categoryHandler, categoryVideos, setCategoryVideos } =
    useCategory();

  const {
    isLoading: categoryLoading,
    data: allCategory,
    error: categoryError,
  } = categories;

  const allCategoriesHandler = () => {
    setCategoryVideos(videos.data);
  };

  useEffect(() => {
    setCategoryVideos(videos.data);
  }, [videos]);

  return (
    <div>
      <img src={banner} className="img_banner" alt="poster" loading="lazy" />

      <div className="category-chips">
        <button
          className="btn btn-secondary btn-secondary-outline btn-chip"
          onClick={allCategoriesHandler}
        >
          All
        </button>
        {allCategory.map((item) => (
          <button
            className="btn btn-secondary btn-secondary-outline btn-chip"
            onClick={() => categoryHandler(item)}
            key={item._id}
          >
            {item.categoryName}
          </button>
        ))}
      </div>

      <div className="all_videos_container">
        {categoryVideos.map((details) => (
          <li key={details._id}>
            <VideoCard details={details} />
          </li>
        ))}
      </div>
    </div>
  );
};
