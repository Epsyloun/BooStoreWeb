import React from "react";
import { Box, Fade, Typography } from "@mui/material";
import { useInView } from "../../hook/useInView";

export default function TitleComponent({ title }) {
  const { ref, inView } = useInView();
  return (
    <Box ref={ref} sx={{ mt: 2, mb: 2 }}>
      <Fade in={inView} timeout={500}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "inline-block",
              height: "2em",
              width: "8px",
              borderRadius: "2px",
              backgroundColor: "primary.main",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
}
