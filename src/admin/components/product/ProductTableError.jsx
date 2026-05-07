import React from "react";
import { Paper, Box, Typography, Button, useTheme } from "@mui/material";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

export default function ProductTableError({ onRetry, error }) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: "100%",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: theme.palette.primary.light,
          mb: 2,
        }}
      >
        <FaExclamationTriangle size={50} color={theme.palette.primary.main} />
      </Box>

      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 1,
          textAlign: "center",
        }}
      >
        Error al cargar los productos
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          mb: 3,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        {error ||
          "Parece que hubo un problema al cargar los datos. Por favor, intenta de nuevo."}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<FaRedo />}
        onClick={onRetry}
        sx={{
          px: 4,
          py: 1.5,
        }}
      >
        Reintentar
      </Button>
    </Paper>
  );
}
