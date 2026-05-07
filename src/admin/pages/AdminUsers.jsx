import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Box
      bgcolor="background.adminBackground"
      color="background.contrastText"
      minHeight="100vh"
      px={4}
      py={4}
    >
      <Typography variant="h4" className="font-title" fontWeight={600}>
        Dashboard de Usuarios
      </Typography>
    </Box>
  );
}
