import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

type PersonItemProps = {
  person: {
    profile_path: string;
    name: string;
    original_name: string;
  };
};
export default function PeopleResultItem({
  person: { profile_path, name, original_name },
}: PersonItemProps) {
  const imgSrc = `https://image.tmdb.org/t/p/w300${profile_path}`;
  return (
    <Box mb={4}>
      <Box
        sx={{
          display: "flex",
          width: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {profile_path ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 170, sm: 200, md: 220, lg: 240, xl: 250 },
            }}
          >
            <Image
              src={imgSrc}
              style={{ objectFit: "cover" }}
              alt={original_name}
              title={name}
              fill
            />
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: (theme) => theme.palette.background.paper,
              height: { xs: 170, sm: 200, md: 220, lg: 240, xl: 250 },
            }}
          >
            <ImageNotSupportedIcon fontSize="large" />
          </Box>
        )}

        <Box sx={{ mt: 1, width: 1 }}>
          <Typography
            variant="body1"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
