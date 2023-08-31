import { Box, SxProps } from "@mui/material";
import Image from "next/image";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

type MediaProps = {
  poster_path: string | null;
  alt: string;
  sx?: SxProps;
};

export default function Media({ poster_path, alt, sx }: MediaProps) {
  const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;
  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: 170, md: 240 },
        backgroundColor: "background.paper",
        height: { xs: 250, md: 360 },
        ...sx,
      }}
    >
      {poster_path ? (
        <Image
          src={imgSrc}
          style={{ objectFit: "cover", borderRadius: 6 }}
          alt={alt}
          title={alt}
          fill
        />
      ) : (
        <Box
          width={1}
          height={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            color: "text.primary",
          }}
        >
          <ImageNotSupportedIcon fontSize="large" />
        </Box>
      )}
    </Box>
  );
}
