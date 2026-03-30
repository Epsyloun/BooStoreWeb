import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function ProductElement({
  image,
  title = "Producto ejemplo",
  price = "$19.99",
  onAdd,
  onView,
}) {
  return (
    <Card
      sx={(theme) => ({
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backgroundColor: alpha(theme.palette.background.default, 0.5),
        backdropFilter: "blur(10px)",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.5)}`,
        },
      })}
    >
      {/* Imagen */}
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: 180,
          objectFit: "cover",
        }}
      />

      {/* Contenido */}
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          sx={(theme) => ({
            color: theme.palette.primary.main,
            fontWeight: 700,
            mb: 2,
          })}
        >
          {price}
        </Typography>

        {/* Botones */}
        <Box sx={{ display: "flex", gap: 1 }}>
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
      </CardContent>
    </Card>
  );
}
