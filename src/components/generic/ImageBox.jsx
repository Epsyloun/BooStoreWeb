import React from "react";
import { Box, Zoom } from "@mui/material";

export default function ImageBox({ src, alt, sx, timeout = 500, delay = 0 }) {
  return (
    <Zoom in={true} timeout={timeout} style={{ transitionDelay: delay }}>
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
