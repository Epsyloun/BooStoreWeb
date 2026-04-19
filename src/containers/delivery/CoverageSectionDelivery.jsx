import {
  alpha,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Grow,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  FaTruck,
  FaCalendarDay as FaCalendarDays,
  FaStore,
  FaCarSide,
  FaGlobeAmericas,
  FaCheck,
  FaStopwatch,
  FaMapPin,
  FaMoneyBillWave,
  FaClock,
  FaPhone,
  FaInfoCircle,
  FaHandsHelping,
} from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
export const CoverageSectionDelivery = () => {
  const theme = useTheme();

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontFamily: "Khand",
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <FaMapLocationDot color={theme.palette.primary.main} />
        Nuestras Opciones de Envío
      </Typography>

      <Grid container spacing={3}>
        {/* Card 1: Punto Fijo */}
        <Grid size={{ xs: 12, md: 4 }} display="flex">
          <Box
            sx={{
              width: "100%",
              border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: `0 12px 30px ${alpha(
                  theme.palette.primary.main,
                  0.3,
                )}`,
              },
            }}
          >
            <Grow in={true} timeout={600}>
              <Card
                sx={{
                  height: "100%",
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.15,
                  )}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      mb: 2,
                      fontSize: "2rem",
                      display: "flex",
                      color: "primary.main",
                    }}
                  >
                    <FaStore size={32} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
                  >
                    Punto Fijo
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
                    Retira tu pedido directamente en nuestras oficinas sin
                    problemas. Disponible todos los días durante nuestro horario
                    de atención.
                  </Typography>
                  <Stack spacing={1.5}>
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
                        <FaCheck size={14} /> Disponibilidad
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Siempre disponible
                      </Typography>
                    </Box>
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
                        <FaStopwatch size={14} /> Tiempo de Preparación
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        2-4 horas
                      </Typography>
                    </Box>
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
                        <FaMapPin size={14} /> Ubicación
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ mt: 0.5, color: "secondary.main" }}
                      >
                        Calle al Volcán, Col. Mirasol, Local 25-D
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ mt: 0.5, color: "gray", fontSize: "0.75rem" }}
                      >
                        Zona comercial, sobre Bulevar Constitución
                      </Typography>
                    </Box>
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
                        <FaGlobeAmericas size={14} /> Cobertura
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        San Ramón, Mejicanos
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        </Grid>

        {/* Card 2: Envíos San Salvador (UBER) */}
        <Grid size={{ xs: 12, md: 4 }} display="flex">
          <Box
            sx={{
              width: "100%",
              border: `2px solid ${alpha("#FF6B35", 0.3)}`,
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: `0 12px 30px ${alpha("#FF6B35", 0.3)}`,
              },
            }}
          >
            <Grow in={true} timeout={700}>
              <Card
                sx={{
                  height: "100%",
                  background: `linear-gradient(135deg, ${alpha(
                    "#FF6B35",
                    0.15,
                  )}, ${alpha("#FF6B35", 0.05)})`,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      mb: 2,
                      fontSize: "2rem",
                      display: "flex",
                      color: "#FF6B35",
                    }}
                  >
                    <FaCarSide size={32} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", mb: 2, color: "#FF6B35" }}
                  >
                    Envío a San Salvador
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
                    Realizamos entregas en San Salvador a través de la
                    plataforma UBER. Rápido, confiable y fácil de rastrear.
                  </Typography>
                  <Stack spacing={1.5}>
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
                        <FaTruck size={14} /> Medio de Transporte
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        UBER
                      </Typography>
                    </Box>
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
                        <FaMoneyBillWave size={14} /> Forma de Pago
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Transferencia antes del envío
                      </Typography>
                    </Box>
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
                        <FaStopwatch size={14} /> Tiempo de Entrega
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        1-2 horas (según demanda)
                      </Typography>
                    </Box>
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
                        <FaGlobeAmericas size={14} /> Cobertura
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        San Salvador
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        </Grid>

        {/* Card 3: Envío Interdepartamental (Melo Express) */}
        <Grid size={{ xs: 12, md: 4 }} display="flex">
          <Box
            sx={{
              width: "100%",
              border: `2px solid ${alpha("#00D9FF", 0.3)}`,
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: `0 12px 30px ${alpha("#00D9FF", 0.3)}`,
              },
            }}
          >
            <Grow in={true} timeout={800}>
              <Card
                sx={{
                  height: "100%",
                  background: `linear-gradient(135deg, ${alpha(
                    "#00D9FF",
                    0.15,
                  )}, ${alpha("#00D9FF", 0.05)})`,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      mb: 2,
                      fontSize: "2rem",
                      display: "flex",
                      color: "#00D9FF",
                    }}
                  >
                    <FaGlobeAmericas size={32} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", mb: 2, color: "#00D9FF" }}
                  >
                    Envío Nacional
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
                    Trabajamos con Melo Express, empresa de encomendistas líder
                    que nos permite llegar a todo Colombia con entregas seguras.
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "gray",
                          textTransform: "uppercase",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FaHandsHelping size={14} /> Aliado Logístico
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Melo Express
                      </Typography>
                    </Box>
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
                        <FaStopwatch size={14} /> Tiempo de Entrega
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        1-5 días (según zona)
                      </Typography>
                    </Box>
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
                        <FaCalendarDays size={14} /> Disponibilidad
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Según fechas y zonas de Melo Express
                      </Typography>
                    </Box>
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
                        <FaGlobeAmericas size={14} /> Cobertura
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Todo Colombia
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
