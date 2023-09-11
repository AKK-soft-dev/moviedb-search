import { useRef, useState } from "react";
import {
  Box,
  IconButton,
  Pagination,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BSGridContainer from "@/components/utils/BSGridContainer";
import BSGridItem from "@/components/utils/items/BSGridItem";
import { PanelProps } from "./watchlist-types";
import useWatchListItemDeleteMode from "./useWatchListDeleteMode";
import useWatchList, { MovieType, TVShowType } from "@/utils/useWatchList";

export type PanelType = "movie" | "tv";
type Props = {
  type: PanelType;
  ItemDisplayComponent: React.ElementType;
};

type ToDeleteType = {
  mediaId: number | string;
  media: MovieType | TVShowType;
};

export default function withPanel({ type, ItemDisplayComponent }: Props) {
  function Panel(props: PanelProps) {
    const { data, title } = props;
    const { panelData, panelType } = data;
    const [page, setPage] = useState(1);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const { deleteMode } = useWatchListItemDeleteMode();
    const { deleteMovieFromWatchList, deleteTVShowFromWatchList } =
      useWatchList();
    const [toDeleteItem, setToDeleteItem] = useState<ToDeleteType | null>(null);
    const toDeleteItemMedia = toDeleteItem?.media;

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      setPage(value);
      if (panelType === "movie") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    };

    console.log({ backdropOpen });
    const handleConfirmDialogOpen = (toDelete: ToDeleteType) => {
      if (!backdropOpen) {
        setConfirmDialogOpen(true);
        setToDeleteItem(toDelete);
      }
    };

    const handleConfirmDialogClose = ({ confirm }: { confirm: boolean }) => {
      setConfirmDialogOpen(false);

      if (toDeleteItem && confirm) {
        const { mediaId, media } = toDeleteItem;
        handleDelete(mediaId, media);
      }
    };

    const handleDelete = (
      mediaId: string | number,
      media: MovieType | TVShowType
    ) => {
      const deleteItem =
        panelType === "movie"
          ? deleteMovieFromWatchList
          : deleteTVShowFromWatchList;

      setBackdropOpen(true);
      deleteItem({
        watchListItemId: media._id,
        mediaId: mediaId as number,
        onSettled() {
          setBackdropOpen(false);
        },
      });
    };

    const totalItemsPerPage = 10;
    const totalItems = (panelData && panelData.length) || 0;
    const totalPages = Math.ceil(totalItems / totalItemsPerPage);

    const startIndex = (page - 1) * totalItemsPerPage;
    const endIndex = page * totalItemsPerPage;

    return (
      <Box>
        {title}
        <BSGridContainer>
          {panelData?.slice(startIndex, endIndex).map((data, i) => {
            const mediaId =
              panelType === "movie"
                ? panelData[i].movie_id
                : panelData[i].tvshow_id;

            return (
              <BSGridItem key={mediaId}>
                <Box sx={{ position: "relative" }}>
                  {deleteMode && (
                    <Box
                      sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                    >
                      <IconButton
                        color="error"
                        onClick={() =>
                          handleConfirmDialogOpen({ mediaId, media: data })
                        }
                      >
                        <DeleteIcon fontSize="large" sx={{ color: "red" }} />
                      </IconButton>
                    </Box>
                  )}
                  <Box
                    sx={{
                      pointerEvents: deleteMode ? "none" : "auto",
                      opacity: deleteMode ? 0.7 : 1,
                    }}
                  >
                    <ItemDisplayComponent data={{ id: mediaId, ...data }} />
                  </Box>
                </Box>
              </BSGridItem>
            );
          })}
        </BSGridContainer>

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" my={2}>
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={totalPages > 500 ? 500 : totalPages}
              showLastButton
              showFirstButton
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
        <Dialog
          open={confirmDialogOpen}
          onClose={handleConfirmDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            elevation: 0,
          }}
        >
          <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {toDeleteItemMedia && (
                <>
                  <Typography component="span" fontWeight={500}>
                    &ldquo;
                    {panelType === "movie"
                      ? (toDeleteItemMedia as MovieType).title
                      : (toDeleteItemMedia as TVShowType).name}
                    &rdquo;
                  </Typography>{" "}
                  with user score{" "}
                  <Typography component="span" fontWeight={500}>
                    {toDeleteItemMedia?.vote_average?.toFixed(1)}
                  </Typography>{" "}
                  will be deleted from your watch list!
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => handleConfirmDialogClose({ confirm: false })}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => handleConfirmDialogClose({ confirm: true })}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Backdrop
          open={backdropOpen}
          sx={{
            color: "#fff",
            zIndex: 2000,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    );
  }
  Panel.displayName = `${type[0].toUpperCase()}${type.slice(1)}Panel`;
  return Panel;
}
