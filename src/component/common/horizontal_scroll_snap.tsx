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
        gap: "8px",
        scrollSnapType: "x mandatory",
        scrollPadding: "0px 16px",
        paddingX: "16px",
        paddingTop: "6px",
        paddingBottom: "16px",
        "& > *": {
          scrollSnapAlign: "start",
          flex: "0 0 auto",
          // Set width to less than 100% to ensure part of the next item is visible
          width: items.length > 1 ? "95%" : "100%",
          // Add a margin to create space between the items
          marginRight: items.length > 1 ? "10px" : "0",
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
        item && <Box key={index}>
          {item}
        </Box>
      ))}
    </Box>
  );
};

export default HorizontalScrollSnap;
