import { ImageResponse } from "next/server";
import SearchIcon from "@mui/icons-material/Search";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "MovieDB Search";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "#1a2138",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginLeft: "8px" }}>
          <SearchIcon sx={{ fontSize: 128 }} />
        </div>

        <span
          style={{
            fontWeight: 700,
            backgroundImage: `linear-gradient(45deg, rgb(255, 231, 52), #ff4345)`,
            backgroundBlendMode: "overlay, overlay, overlay, overlay, normal",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          MovieDB Search
        </span>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
