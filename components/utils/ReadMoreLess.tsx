"use client";
import { Typography } from "@mui/material";
import { useMemo, useState } from "react";

export default function ReadMoreLess({
  content,
  maxLengthLimit,
  totalContentLengthToDisplay,
}: {
  content: string;
  maxLengthLimit: number;
  totalContentLengthToDisplay: number;
}) {
  const [readMore, setReadMore] = useState(false);
  const contentLength = content.length || 0;
  const exceedMaxLength = contentLength > maxLengthLimit;

  const contentWithReadMore = useMemo(
    () => (
      <>
        {content &&
          (exceedMaxLength ? (
            <>
              {content.slice(0, totalContentLengthToDisplay)}...
              <Typography
                variant="body1"
                onClick={() => setReadMore(true)}
                sx={{
                  display: "inline-block",
                  color: "primary.main",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Read more
              </Typography>
            </>
          ) : (
            content
          ))}
      </>
    ),
    [content, exceedMaxLength, totalContentLengthToDisplay]
  );

  const contentWithReadLess = useMemo(
    () => (
      <>
        {content &&
          (exceedMaxLength ? (
            <>
              {content}{" "}
              <Typography
                variant="body1"
                onClick={() => setReadMore(false)}
                sx={{
                  display: "inline-block",
                  color: "primary.main",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Read less
              </Typography>
            </>
          ) : (
            content
          ))}
      </>
    ),
    [content, exceedMaxLength]
  );

  return readMore ? contentWithReadLess : contentWithReadMore;
}
