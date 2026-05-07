import React from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import AdminSideBar from "../admin/components/generic/AdminSideBar";
import { useAuthContext } from "../admin/context/useAuthContext";

const SIDEBAR_WIDTH_COLLAPSED = "60px";
const SIDEBAR_WIDTH_EXPANDED = "250px";

export default function AdminLayout() {
  const { user } = useAuthContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  if (!user) {
    return <Outlet />; // O un componente de carga, o redirigir a login
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <AdminSideBar />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flex: 1,
          marginLeft: isMobile ? 0 : SIDEBAR_WIDTH_COLLAPSED,
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          width: isMobile
            ? "100%"
            : `calc(100% - ${SIDEBAR_WIDTH_COLLAPSED}px)`,
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
