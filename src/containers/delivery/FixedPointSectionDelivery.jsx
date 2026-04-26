import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Grow,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import {
  FaClock,
  FaPhone,
  FaCalendarDay as FaCalendarDays,
  FaMapPin,
} from "react-icons/fa";

const DELIVERY_ADDRESS =
  "Calle al Volcán, Colonia Mirasol, Local 25-D, San Ramón, Mejicanos";
const DELIVERY_MAPS_URL = "https://maps.app.goo.gl/Cnub6hVgq8ATKZ3c7";

export const FixedPointSectionDelivery = () => {
  const theme = useTheme();

  const handleOpenMaps = () => {
    window.open(DELIVERY_MAPS_URL, "_blank");
  };

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
        }}
      >
        Nuestro Punto Fijo
      </Typography>

      <Grid container spacing={4} alignItems="stretch" justifyContent="center">
        {/* Info Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grow in={true} timeout={800}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  0.1,
                )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                p: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
                >
                  <FaMapPin size={14} /> Ubicación
                </Typography>

                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "gray", textTransform: "uppercase" }}
                    >
                      Dirección
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      {DELIVERY_ADDRESS}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "gray",
                        fontSize: "0.75rem",
                        mt: 0.5,
                        display: "block",
                      }}
                    >
                      Zona comercial, subiendo un poco más arriba de la
                      intersección con el Bulevar Constitución
                    </Typography>
                    <Typography
                      variant="body2"
                      color="secondary.main"
                      sx={{
                        mt: 0.5,
                        display: "block",
                      }}
                    >
                      Importante mencionar que solo es el punto de entrega no
                      tenemos ninguna alianza con el local, es solo para que
                      puedan recoger sus pedidos ahí
                    </Typography>
                  </Box>

                  <Divider
                    sx={{ borderColor: alpha(theme.palette.primary.main, 0.2) }}
                  />

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "gray",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <FaClock size={14} /> Horario de Atención
                    </Typography>
                    <Stack spacing={0.5} sx={{ mt: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <FaCalendarDays size={14} /> Lunes - Viernes
                      </Typography>
                      <Typography variant="caption" sx={{ color: "gray" }}>
                        8:00 AM - 10:00 PM
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <FaCalendarDays size={14} /> Sábado y Domingo
                      </Typography>
                      <Typography variant="caption" sx={{ color: "gray" }}>
                        8:00 AM - 10:00 PM
                      </Typography>
                    </Stack>
                  </Box>

                  <Divider
                    sx={{ borderColor: alpha(theme.palette.primary.main, 0.2) }}
                  />

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "gray",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <FaPhone size={14} /> Contacto
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Teléfono:</strong> +57 (4) 1234-5678
                    </Typography>
                    <Typography variant="body2">
                      <strong>Email:</strong> info@boostore.com
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleOpenMaps}
                    sx={{
                      mt: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      transition: "all 0.3s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: `0 10px 30px ${alpha(
                          theme.palette.primary.main,
                          0.4,
                        )}`,
                      },
                    }}
                  >
                    <FaMapPin /> Ver en Google Maps
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        {/* QR Code */}
        <Grid size={{ xs: 12, sm: 10, md: 6 }} display="flex">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Grow in={true} timeout={1000}>
              <Card
                sx={{
                  width: "100%",
                  height: {
                    xs: "auto",
                    md: "100%",
                  },
                  p: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.secondary.main,
                    0.1,
                  )}, ${alpha(theme.palette.primary.main, 0.1)})`,
                  border: `2px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Escanea nuestro QR
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", display: "block", mb: 2 }}
                  >
                    Ubicación directa en Google Maps
                  </Typography>

                  {/* QR Generator */}
                  <Box
                    sx={{
                      background: theme.palette.background.paper,
                      p: 2,
                      borderRadius: 2,
                      display: "inline-block",
                    }}
                  >
                    <QRCodeSVG
                      value={DELIVERY_MAPS_URL}
                      size={200}
                      level="H"
                      fgColor={theme.palette.secondary.main}
                      bgColor={theme.palette.background.paper}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ color: "gray", display: "block", mt: 2 }}
                  >
                    ¡Toca con tu cámara para ubicarnos!
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
