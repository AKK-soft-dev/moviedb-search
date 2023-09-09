import { FetcherType, useDataQuery, useDataQueryMagic } from "react-data-query";
import { useCallback } from "react";
import {
  WatchListMovieType,
  WatchListTVShowType,
} from "@/app/api/watchlist/watchlist-types";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

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

  const { enqueueSnackbar } = useSnackbar();

  const watchListKey = ["WatchListMovieDBSearch", userId].toString();

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
        return !!movies.find(({ movie_id }) => movie_id === parseInt(movieId));
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
          ({ tvshow_id }) => tvshow_id === parseInt(tvShowId)
        );
      }

      return false;
    },
    [watchList, userId]
  );

  const deleteMovie = (movieId: number) => {
    setQueryData(
      watchListKey,
      (prevData: WatchListResponseType | null): WatchListResponseType => {
        const prevMovies = prevData?.movies;
        if (prevMovies && Array.isArray(prevMovies)) {
          return {
            movies: prevMovies.filter((movie) => movie.movie_id !== movieId),
            tvShows: prevData.tvShows || [],
          };
        }

        return {
          movies: prevMovies || [],
          tvShows: prevData?.tvShows || [],
        };
      }
    );
  };

  const deleteMovieFromWatchList = async ({
    watchListItemId, // unique id in mongodb database
    mediaId, // unique movie id of tmdb database
    onSettled,
  }: {
    watchListItemId?: string;
    mediaId: number;
    onSettled?: () => void;
  }) => {
    try {
      const res = await fetch(
        `/api/watchlist/movie/${
          watchListItemId ||
          watchList?.movies.find((movie) => movie.movie_id === mediaId)?._id
        }`,
        {
          method: "DELETE",
        }
      );
      const ok = res.ok;
      const d = await res.json();
      if (!ok) {
        throw new Error(d.message);
      }
      deleteMovie(mediaId);
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } finally {
      onSettled && onSettled();
    }
  };

  const deleteTVShow = (tvShowId: number) => {
    setQueryData(
      watchListKey,
      (prevData: WatchListResponseType | null): WatchListResponseType => {
        const prevTVShows = prevData?.tvShows;
        if (prevTVShows && Array.isArray(prevTVShows)) {
          return {
            tvShows: prevTVShows.filter(
              (tvShow) => tvShow.tvshow_id !== tvShowId
            ),
            movies: prevData.movies || [],
          };
        }

        return {
          movies: prevTVShows || [],
          tvShows: prevData?.tvShows || [],
        };
      }
    );
  };

  const deleteTVShowFromWatchList = async ({
    watchListItemId, // unique id in mongodb database
    mediaId, // unique tvShow id in tmdb database
    onSettled,
  }: {
    watchListItemId?: string;
    mediaId: number;
    onSettled?: () => void;
  }) => {
    try {
      const res = await fetch(
        `/api/watchlist/tvshow/${
          watchListItemId ||
          watchList?.tvShows.find((tvShow) => tvShow.tvshow_id === mediaId)?._id
        }`,
        {
          method: "DELETE",
        }
      );
      const ok = res.ok;
      const d = await res.json();
      if (!ok) {
        throw new Error(d.message);
      }
      deleteTVShow(mediaId);
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } finally {
      onSettled && onSettled();
    }
  };

  return {
    watchList,
    isLoadingWatchList: isFetching,
    setWatchList,
    addMovieToWatchList,
    addTVShowToWatchList,
    checkIfMovieExistInWatchList,
    checkIfTVShowExistInWatchList,
    deleteMovieFromWatchList,
    deleteTVShowFromWatchList,
  };
}
