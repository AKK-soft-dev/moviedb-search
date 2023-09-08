import { MovieType, TVShowType } from "@/utils/useWatchList";

type MoviePanel = {
  panelType: "movie";
  panelData: MovieType[] | null | undefined;
};

type TVShowPanel = {
  panelType: "tv";
  panelData: TVShowType[] | null | undefined;
};

export interface PanelProps {
  data: MoviePanel | TVShowPanel;
  title: React.ReactNode;
}
