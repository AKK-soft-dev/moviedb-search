"use client";
import { CircularProgress, IconButton, IconButtonProps } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";
import CustomTooltip from "./CustomTooltip";
import {
  WatchListMovieType,
  WatchListTVShowType,
} from "@/app/api/watchlist/watchlist-types";
import { useSession } from "next-auth/react";
import useWatchList from "@/utils/useWatchList";

type MovieType = {
  media_type: "movie";
  payload: Omit<WatchListMovieType, "userId">;
};

type TVShowType = {
  media_type: "tvshow";
  payload: Omit<WatchListTVShowType, "userId">;
};

type Props = {
  mediaId: string;
  data: MovieType | TVShowType; // discriminated unions type
  buttonProps?: IconButtonProps;
};

export default function AddToWatchListButton({
  data,
  buttonProps,
  mediaId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user: any = session?.user;
  const userId = user?.id;
  const { media_type, payload } = data;
  const {
    watchList,
    isLoadingWatchList,
    checkIfMovieExistInWatchList,
    checkIfTVShowExistInWatchList,
    addMovieToWatchList,
    addTVShowToWatchList,
  } = useWatchList();

  const body: WatchListMovieType | WatchListTVShowType = { userId, ...payload };
  const checker =
    media_type === "movie"
      ? checkIfMovieExistInWatchList
      : checkIfTVShowExistInWatchList;

  const handleAdd = () => {
    if (!checker(mediaId)) {
      setLoading(true);
      fetch(`/api/watchlist/${media_type}`, {
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const adder =
            media_type === "movie" ? addMovieToWatchList : addTVShowToWatchList;
          if (!data.message) {
            adder(data);
          }
          setLoading(false);
        });
    }
  };

  const exists = checker(mediaId);
  console.log({ exists, watchList });
  return (
    <CustomTooltip title={`Add${exists ? "ed" : ""} to watch list`}>
      {loading || isLoadingWatchList ? (
        <CircularProgress />
      ) : (
        <IconButton color="primary" {...buttonProps} onClick={handleAdd}>
          {exists ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      )}
    </CustomTooltip>
  );
}
