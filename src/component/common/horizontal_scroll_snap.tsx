import React from "react";
import { Box } from "@mui/material";

interface HorizontalScrollSnapProps {
  items: React.ReactNode[];
}

const HorizontalScrollSnap: React.FC<HorizontalScrollSnapProps> = ({
  items,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: "16px",
        scrollSnapType: "x mandatory",
        scrollPadding: "0px 16px",
        paddingX: "16px",
        paddingTop: "6px",
        paddingBottom: "16px",
        "& > *": {
          scrollSnapAlign: "start",
          flex: "0 0 auto",
        },
        "&::-webkit-scrollbar": {
          display: "none",
        },
        maxWidth: "100vw",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {items.map((item, index) => (
        <Box key={index} sx={{ width: "95%" }}>
          {item}
        </Box>
      ))}
    </Box>
  );
};

export default HorizontalScrollSnap;
