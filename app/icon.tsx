import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          M
        </span>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
