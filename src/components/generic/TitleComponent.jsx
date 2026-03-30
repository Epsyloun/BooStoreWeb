import React from "react";
import { Box, Typography } from "@mui/material";

export default function TitleComponent({ title }) {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
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
    </Box>
  );
}
