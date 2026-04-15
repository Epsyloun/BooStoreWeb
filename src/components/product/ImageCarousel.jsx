import React from "react";
import { Box, Stack, IconButton, useTheme, useMediaQuery } from "@mui/material";
import {
  BiChevronUp,
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import { alpha } from "@mui/material/styles";

export default function ImageCarousel({
  images = [],
  selectedIndex = 0,
  onSelectImage,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!images || images.length === 0) {
    return null;
  }

  const handlePrev = () => {
    const newIndex =
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    onSelectImage?.(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    onSelectImage?.(newIndex);
  };

  return (
    <Stack
      direction={isMobile ? "row" : "column"}
      spacing={1}
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Botón anterior */}
      {images.length > 1 && (
        <IconButton
          onClick={handlePrev}
          size="small"
          sx={{
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
            order: isMobile ? -1 : 0,
          }}
        >
          {isMobile ? <BiChevronLeft size={20} /> : <BiChevronUp size={20} />}
        </IconButton>
      )}

      {/* Contenedor de miniaturas */}
      <Stack
        direction={isMobile ? "row" : "column"}
        spacing={1}
        sx={{
          overflowX: isMobile ? "auto" : "hidden",
          overflowY: !isMobile ? "auto" : "hidden",
          maxHeight: isMobile ? "80px" : "400px",
          maxWidth: isMobile ? "100%" : "80px",
          pb: isMobile ? 1 : 0,
          px: isMobile ? 0 : 0,
          py: !isMobile ? 1 : 0,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: isMobile ? "4px" : "4px",
            height: isMobile ? "4px" : "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(theme.palette.primary.main, 0.3),
            borderRadius: 2,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.5),
            },
          },
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image.url}
            alt={`Producto vista ${index + 1}`}
            onClick={() => onSelectImage?.(index)}
            sx={{
              width: isMobile ? "70px" : "70px",
              height: isMobile ? "70px" : "70px",
              minWidth: "70px",
              minHeight: "70px",
              borderRadius: 1.5,
              objectFit: "cover",
              cursor: "pointer",
              border: `2px solid ${
                selectedIndex === index
                  ? theme.palette.primary.main
                  : "transparent"
              }`,
              opacity: selectedIndex === index ? 1 : 0.6,
              transition: "all 0.3s ease",
              "&:hover": {
                opacity: 1,
                borderColor: alpha(theme.palette.primary.main, 0.5),
              },
            }}
          />
        ))}
      </Stack>

      {/* Botón siguiente */}
      {images.length > 1 && (
        <IconButton
          onClick={handleNext}
          size="small"
          sx={{
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
            order: isMobile ? 1 : 0,
          }}
        >
          {isMobile ? (
            <BiChevronRight size={20} />
          ) : (
            <BiChevronDown size={20} />
          )}
        </IconButton>
      )}
    </Stack>
  );
}
