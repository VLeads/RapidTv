import {
  HistoryIcon,
  HomeIcon,
  LikeOutlineIcon,
  PlaylistIcon,
  TrendingIcon,
  WatchLaterOutlineIcon,
} from "assets/icons/icons";
import { v4 as uuid } from "uuid";

export const sidebarNav = [
  {
    _id: uuid(),
    linkTo: "/",
    linkName: "Discover",
    icon: <HomeIcon />,
  },
  {
    _id: uuid(),
    linkTo: "trending",
    linkName: "Trending",
    icon: <TrendingIcon />,
  },
  {
    _id: uuid(),
    linkTo: "history",
    linkName: "History",
    icon: <HistoryIcon />,
  },
  {
    _id: uuid(),
    linkTo: "playlist",
    linkName: "Playlist",
    icon: <PlaylistIcon />,
  },
  {
    _id: uuid(),
    linkTo: "liked",
    linkName: "Liked",
    icon: <LikeOutlineIcon />,
  },
  {
    _id: uuid(),
    linkTo: "watch-later",
    linkName: "Watch Later",
    icon: <WatchLaterOutlineIcon />,
  },
];
