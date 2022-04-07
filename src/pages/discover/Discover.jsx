import React, { useEffect, useState } from "react";
import banner from "assets/img/Rapidtv-poster.png";
import "./discover.css";
import { useCategory, useVideo } from "context";
import { Modal, VideoCard } from "components";

export const Discover = () => {
  const [selectedTab, setSelectedTab] = useState("all");
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

  const activeBtnHandler = (e) => {
    setSelectedTab(e.target.name);
  };

  return (
    <div>
      <img src={banner} className="img_banner" alt="poster" loading="lazy" />

      <div className="category-chips">
        <button
          name="all"
          className={`btn btn-secondary-outline btn-chip ${
            selectedTab === "all" ? "active-btn-chip" : ""
          }`}
          onClick={(e) => {
            allCategoriesHandler();
            activeBtnHandler(e);
          }}
        >
          All
        </button>
        {allCategory.map((item) => (
          <button
            name={item.categoryName}
            // className="btn btn-secondary btn-secondary-outline btn-chip"
            className={`btn btn-secondary btn-secondary-outline btn-chip ${
              selectedTab === item.categoryName ? "active-btn-chip" : ""
            }`}
            onClick={(e) => {
              categoryHandler(item);
              activeBtnHandler(e);
            }}
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
      <Modal />
    </div>
  );
};
