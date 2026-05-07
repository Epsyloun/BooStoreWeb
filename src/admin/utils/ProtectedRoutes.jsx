import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { Box, CircularProgress } from "@mui/material";

/**
 * Componente que protege rutas requiriendo autenticación de admin
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente a renderizar si está autenticado
 * @param {string} props.redirectTo - Ruta a la que redirigir si no está autenticado (default: "/admin/login")
 * @returns {React.ReactNode}
 */
export default function ProtectedRoutes({
  children,
  redirectTo = "/admin/login",
}) {
  const { isAuthenticated, loading, user } = useAuthContext();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Si no está autenticado o no es admin, redirigir
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to={redirectTo} replace />;
  }

  // Si está autenticado y es admin, renderizar los children
  return children;
}
