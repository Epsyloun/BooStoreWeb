import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

export default function ProductUnavailable({ title, subtitle }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          textAlign: "center",
          py: 4,
        }}
      >
        {/* Icono */}
        <Box
          sx={{
            fontSize: 120,
            mb: 3,
            color: theme.palette.secondary.main,
            opacity: 0.7,
          }}
        >
          <BiSearch />
        </Box>

        {/* Título */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 1,
            fontFamily: "Khand",
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title || "Producto No Disponible"}
        </Typography>

        {/* Descripción */}
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            mb: 4,
            maxWidth: 500,
            lineHeight: 1.8,
          }}
        >
          {subtitle ||
            "El producto que estás buscando no existe o no está disponible."}
        </Typography>

        {/* Decoración */}
        <Box
          sx={{
            width: 60,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            borderRadius: 2,
            mb: 4,
          }}
        />

        {/* Botones */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/products")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              px: 4,
              py: 1.5,
            }}
          >
            Explorar Otros Productos
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              px: 4,
              py: 1.5,
            }}
          >
            Volver a Inicio
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
