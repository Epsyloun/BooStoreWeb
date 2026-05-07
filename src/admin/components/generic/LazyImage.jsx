import React, { useState, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

// Componente para cargar la imagen
const LazyImage = ({ src, alt, width = 60, height = 60 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width,
        height,
        position: "relative",
      }}
    >
      {isLoading && (
        <CircularProgress
          size={30}
          sx={{
            position: "absolute",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        style={{
          width,
          height,
          objectFit: "cover",
          borderRadius: 4,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
      {error && (
        <Box
          sx={{
            width,
            height,
            borderRadius: 1,
            backgroundColor: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            color: "#999",
          }}
        >
          N/A
        </Box>
      )}
    </Box>
  );
};

export default LazyImage;
