import {
  alpha,
  Box,
  Container,
  Grow,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FaTruck } from "react-icons/fa";

export const HeroSectionDelivery = () => {
  const theme = useTheme();

  return (
    <Container>
      <Grow in={true} timeout={800}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.1,
            )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            borderRadius: 3,
            p: { xs: 3, md: 6 },
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            textAlign: "center",
          }}
        >
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <FaTruck
              size={40}
              color={theme.palette.primary.main}
              style={{ animation: "pulse 2s infinite" }}
            />
          </Stack>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Envíos y Entregas
          </Typography>
          <Typography variant="h6" color="gray">
            Conoce nuestras opciones de envío a nivel nacional y nuestro punto
            fijo de entrega
          </Typography>
        </Box>
      </Grow>
    </Container>
  );
};
