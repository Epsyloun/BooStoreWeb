import React from "react";
import { Box, Zoom } from "@mui/material";

export default function ImageBox({ src, alt, sx }) {
  return (
    <Zoom in={true} timeout={500}>
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          ...sx,
        }}
      />
    </Zoom>
  );
}
