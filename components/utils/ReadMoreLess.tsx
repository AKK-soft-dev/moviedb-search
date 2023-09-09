"use client";
import { Typography, TypographyProps, styled } from "@mui/material";
import { useMemo, useState } from "react";

const StyledTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  display: "inline-block",
  color: theme.palette.primary.main,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

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
              <StyledTypography
                variant="body1"
                component="span"
                onClick={() => setReadMore(true)}
              >
                Read more
              </StyledTypography>
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
              <StyledTypography
                variant="body1"
                component="span"
                onClick={() => setReadMore(false)}
              >
                Read less
              </StyledTypography>
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
