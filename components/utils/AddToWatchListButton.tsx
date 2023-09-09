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
import { enqueueSnackbar, useSnackbar } from "notistack";

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
    isLoadingWatchList,
    checkIfMovieExistInWatchList,
    checkIfTVShowExistInWatchList,
    addMovieToWatchList,
    addTVShowToWatchList,
    deleteMovieFromWatchList,
    deleteTVShowFromWatchList,
  } = useWatchList();

  const { enqueueSnackbar } = useSnackbar();

  const body: WatchListMovieType | WatchListTVShowType = { userId, ...payload };
  const checker =
    media_type === "movie"
      ? checkIfMovieExistInWatchList
      : checkIfTVShowExistInWatchList;

  const handleAdd = () => {
    if (userId) {
      const exists = checker(mediaId);
      if (exists) {
        const deleteItem =
          media_type === "movie"
            ? deleteMovieFromWatchList
            : deleteTVShowFromWatchList;
        setLoading(true);
        deleteItem({
          mediaId: parseInt(mediaId),
          onSettled() {
            setLoading(false);
          },
        });
      } else {
        setLoading(true);
        fetch(`/api/watchlist/${media_type}`, {
          method: "POST",
          body: JSON.stringify(body),
        })
          .then((res) => {
            if (!res.ok) {
              return res.json().then((resData) => {
                throw new Error(
                  `${res.status}: ${resData.message} \n Server Message: ${resData.serverMessage}`
                );
              });
            }
            return res.json();
          })
          .then((data) => {
            const adder =
              media_type === "movie"
                ? addMovieToWatchList
                : addTVShowToWatchList;
            adder(data);
          })
          .catch((err) => {
            enqueueSnackbar((err as Error).message, {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const exists = checker(mediaId);
  return (
    <>
      {loading || isLoadingWatchList ? (
        <CircularProgress />
      ) : (
        <CustomTooltip title={`Add${exists ? "ed" : ""} to watch list`}>
          <IconButton
            color="primary"
            {...buttonProps}
            onClick={handleAdd}
            disabled={!userId}
          >
            {exists ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </CustomTooltip>
      )}
    </>
  );
}
