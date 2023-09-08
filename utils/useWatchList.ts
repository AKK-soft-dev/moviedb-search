import { FetcherType, useDataQuery, useDataQueryMagic } from "react-data-query";
import { useCallback } from "react";
import {
  WatchListMovieType,
  WatchListTVShowType,
} from "@/app/api/watchlist/watchlist-types";
import { useSession } from "next-auth/react";

type CreatorType = {
  _id: string;
  username: string;
  email: string;
  image: string;
};

export type MovieType = Omit<WatchListMovieType, "creator"> & {
  _id: string;
  creator: CreatorType;
};

export type TVShowType = Omit<WatchListTVShowType, "creator"> & {
  _id: string;
  creator: CreatorType;
};

type WatchListResponseType = {
  movies: Array<MovieType>;
  tvShows: Array<TVShowType>;
};

const fetcher: FetcherType = (context) => {
  return fetch(`/api/watchlist/${context.dataQueryKey[1]}`).then((res) =>
    res.json()
  );
};

export default function useWatchList() {
  const { setQueryData, getQueryData } = useDataQueryMagic();
  const { data: session } = useSession();
  const user: any = session?.user;
  const userId = user?.id;

  const watchListKey = ["WatchListMovieDBSearch", userId];

  const getWatchList: () => WatchListResponseType | null = useCallback(() => {
    return getQueryData(watchListKey);
  }, [getQueryData]);

  const { data: watchList, isFetching } = useDataQuery<WatchListResponseType>(
    watchListKey,
    fetcher,
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      autoFetchEnabled: !getWatchList() && !!userId,
    }
  );

  const setWatchList = useCallback(
    (data: WatchListResponseType | null) => {
      setQueryData(watchListKey, () => data);
    },
    [watchListKey]
  );

  const addMovieToWatchList = useCallback(
    (movie: MovieType) => {
      setQueryData(
        watchListKey,
        (prevData: WatchListResponseType | null): WatchListResponseType => {
          return prevData
            ? {
                ...prevData,
                movies: [...prevData.movies, movie],
              }
            : {
                movies: [movie],
                tvShows: [],
              };
        }
      );
    },
    [setQueryData, watchListKey]
  );

  const addTVShowToWatchList = useCallback(
    (tvShow: TVShowType) => {
      setQueryData(
        watchListKey,
        (prevData: WatchListResponseType | null): WatchListResponseType => {
          return prevData
            ? {
                ...prevData,
                tvShows: [...prevData.tvShows, tvShow],
              }
            : {
                movies: [],
                tvShows: [tvShow],
              };
        }
      );
      return false;
    },
    [setQueryData, watchListKey]
  );

  const checkIfMovieExistInWatchList = useCallback(
    (movieId: string) => {
      const movies = watchList && watchList.movies;

      if (movies) {
        return !!movies.find(
          ({ movie_id, creator: { _id } }) =>
            movie_id === parseInt(movieId) && _id === userId
        );
      }

      return false;
    },
    [watchList, userId]
  );

  const checkIfTVShowExistInWatchList = useCallback(
    (tvShowId: string) => {
      const tvShows = watchList && watchList.tvShows;

      if (tvShows) {
        return !!tvShows.find(
          (tvShow) =>
            tvShow.tvshow_id === parseInt(tvShowId) &&
            tvShow.creator._id === userId
        );
      }

      return false;
    },
    [watchList, userId]
  );

  return {
    watchList,
    isLoadingWatchList: isFetching,
    setWatchList,
    addMovieToWatchList,
    addTVShowToWatchList,
    checkIfMovieExistInWatchList,
    checkIfTVShowExistInWatchList,
  };
}
