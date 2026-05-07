import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
  alpha,
  useTheme,
  CardHeader,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { AdminLoginBg } from "../../assets/SvgsComponents";
import { loginWithGoogle } from "../services/auth";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, isAuthenticated, user, loading } = useAuthContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Si el usuario ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (!loading && isAuthenticated && user?.role === "admin") {
      navigate("/admin/home", { replace: true });
    }
  }, [isAuthenticated, user, loading, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const response = await loginWithGoogle();

      if (!response) {
        setLoginError(
          "No tienes acceso al panel. Solo administradores pueden ingresar.",
        );
        setIsLoggingIn(false);
        return;
      }

      // Login exitoso
      const loginSuccess = login(response);
      if (loginSuccess) {
        // La redirección se hace automáticamente en el useEffect
        navigate("/admin/home", { replace: true });
      } else {
        setLoginError("Error al procesar el login. Intenta de nuevo.");
        setIsLoggingIn(false);
      }
    } catch (error) {
      console.error("Error en login:", error);
      setLoginError(error.message || "Error al iniciar sesión con Google");
      setIsLoggingIn(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SVG de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          minWidth: "800px",
          height: "100%",
          zIndex: 0,
        }}
      >
        <AdminLoginBg
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      {/* Contenido del login */}
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
            border: "4px solid",
            borderColor: alpha(theme.palette.primary.main, 0.8),
            overflow: "hidden",
          }}
        >
          {/* Icono */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
              padding: 4,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderRadius: "50%",
            }}
          >
            <FaUserShield
              size={60}
              style={{
                color: theme.palette.primary.main,
              }}
            />
          </Box>
          {/* Título y subtítulo */}
          <CardHeader
            title={"Panel de Administración"}
            subheader="Inicia sesión para continuar"
            titleTypographyProps={{ className: "font-title" }}
            sx={{
              textAlign: "center",
              paddingBottom: 0,
            }}
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Mostrar error si existe */}
            {loginError && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {loginError}
              </Alert>
            )}

            {/* Botón de Google */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              startIcon={
                isLoggingIn ? <CircularProgress size={20} /> : <FaGoogle />
              }
              color="primary"
              sx={{
                padding: 2,
                mb: 1,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {isLoggingIn
                  ? "Iniciando sesión..."
                  : "Inicia sesión con Google"}
              </Typography>
            </Button>

            {/* Pie de login */}
            <Typography
              variant="caption"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                marginTop: "0.5rem",
              }}
            >
              Solo administradores pueden acceder a este panel
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
