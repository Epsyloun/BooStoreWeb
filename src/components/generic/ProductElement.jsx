import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Fade,
  CardActionArea,
  Chip,
  Stack,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useInView } from "../../hook/useInView";

//TODO envolver todo en una card y poner secciones de categoría y tags

export default function ProductElement({ productInfo, onAdd, onView }) {
  const theme = useTheme();
  const { ref, inView } = useInView({
    once: true,
    threshold: 0.2,
  });

  const {
    id,
    title,
    description,
    images,
    categories,
    tags,
    price,
    discountPrice,
  } = productInfo;

  const doublePice = price?.toFixed(2);
  const doubleDiscountPrice = discountPrice?.toFixed(2);

  const isInOffer = discountPrice === null ? false : true;

  return (
    <Box ref={ref} sx={{ display: "flex", height: "100%" }}>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.5s ease",
          backgroundColor: alpha(theme.palette.background.default, 0.5),
          backdropFilter: "blur(10px)",
          transform: inView ? "translateY(0)" : "translateY(30px)",
          opacity: inView ? 1 : 0,
          display: "flex",
          flexDirection: "column",

          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.5)}`,
          },
        }}
      >
        <CardActionArea
          sx={{
            color: "primary.main",
            flex: 1,
            borderRadius: 1,
            width: "100%",
          }}
        >
          {/* Imagen */}
          <Box
            sx={{
              pt: 2,
              pl: 2,
              pr: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={images[0]?.url}
              alt={title}
              loading="lazy"
              sx={{
                height: "180px",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Contenido */}
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                lineHeight: 1.2,
                color: "white.main",
              }}
            >
              {title}
            </Typography>
            <Stack direction={"row"} spacing={1}>
              {isInOffer && (
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontWeight: 700,
                  }}
                >
                  ${doubleDiscountPrice}
                </Typography>
              )}
              <Typography
                variant="h6"
                sx={{
                  color: isInOffer
                    ? theme.palette.text.disabled
                    : theme.palette.primary.main,
                  textDecoration: isInOffer ? "line-through" : null,
                  fontWeight: isInOffer ? 400 : 700,
                }}
              >
                ${doublePice}
              </Typography>
            </Stack>
            {/* Botones */}
          </CardContent>
        </CardActionArea>
        <Box sx={{ display: "flex", gap: 1, p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={onAdd}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Añadir
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={onView}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Ver más
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
