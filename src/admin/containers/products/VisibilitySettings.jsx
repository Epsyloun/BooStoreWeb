import { alpha, Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { TitleSection } from "../../components/product/generalInfo";
import { FaCheck, FaEye } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export const VisibilitySettings = ({ formData, handleChange }) => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={alpha(theme.palette.background.adminBox, 0.5)}
      p={4}
      borderRadius={2}
    >
      <TitleSection
        title="Visibilidad"
        subtitle="Visibilidad del producto"
        icon={<FaEye size={24} color={theme.palette.primary.light} />}
        bgcolor={alpha(theme.palette.primary.main, 0.25)}
      />

      <Stack spacing={2}>
        {/* Visible en tienda */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            p: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            borderRadius: 1.5,
            border: `2px solid ${formData.visibility ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.2)}`,
            cursor: "pointer",
            transition: "all 0.2s ease",
            position: "relative",
            "&:hover": {
              bgcolor: alpha(theme.palette.background.paper, 0.7),
            },
          }}
          onClick={() => {
            handleChange({
              target: {
                name: "visibility",
                value: !formData.visibility,
              },
            });
          }}
        >
          {formData.visibility && (
            <Box
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 32,
                height: 32,
                bgcolor: theme.palette.primary.main,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              <FaCheck size={16} color="#ffffff" />
            </Box>
          )}
          <Stack flex={1}>
            <Typography variant="subtitle2" fontWeight="600">
              Visible en tienda
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Los clientes podrán ver este producto en la tienda
            </Typography>
          </Stack>
        </Box>

        {/* Producto destacado */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            p: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            borderRadius: 1.5,
            border: `2px solid ${formData.featured ? theme.palette.secondary.main : alpha(theme.palette.primary.main, 0.2)}`,
            cursor: "pointer",
            transition: "all 0.2s ease",
            position: "relative",
            "&:hover": {
              bgcolor: alpha(theme.palette.background.paper, 0.7),
            },
          }}
          onClick={() => {
            handleChange({
              target: {
                name: "featured",
                value: !formData.featured,
              },
            });
          }}
        >
          {formData.featured && (
            <Box
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 32,
                height: 32,
                bgcolor: theme.palette.secondary.main,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 2px 8px ${alpha(theme.palette.secondary.main, 0.4)}`,
              }}
            >
              <FaCheck size={16} color="#ffffff" />
            </Box>
          )}
          <Stack flex={1}>
            <Typography variant="subtitle2" fontWeight="600">
              Producto destacado
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Este producto aparecerá en la sección destacada de la tienda
            </Typography>
          </Stack>
        </Box>

        {/* Configuración de popularidad */}
        <Box mt={2}>
          <Typography variant="body2" fontWeight="600" color="primary" mb={1.5}>
            Popularidad
          </Typography>
          <Grid container spacing={2}>
            {/* Popularidad Baja */}
            <Grid size={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  borderRadius: 1.5,
                  border: `2px solid ${formData.popularity === "low" ? theme.palette.error.main : alpha(theme.palette.primary.main, 0.2)}`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                  },
                }}
                onClick={() => {
                  handleChange({
                    target: {
                      name: "popularity",
                      value: "low",
                    },
                  });
                }}
              >
                {formData.popularity === "low" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      width: 32,
                      height: 32,
                      bgcolor: theme.palette.error.main,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 2px 8px ${alpha(theme.palette.error.main, 0.4)}`,
                    }}
                  >
                    <FaCheck size={16} color="#ffffff" />
                  </Box>
                )}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.error.main, 0.2),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaArrowTrendUp size={20} color={theme.palette.error.main} />
                </Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  textAlign="center"
                >
                  Baja
                </Typography>
              </Box>
            </Grid>

            {/* Popularidad Media */}
            <Grid size={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  borderRadius: 1.5,
                  border: `2px solid ${formData.popularity === "medium" ? theme.palette.warning.main : alpha(theme.palette.primary.main, 0.2)}`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                  },
                }}
                onClick={() => {
                  handleChange({
                    target: {
                      name: "popularity",
                      value: "medium",
                    },
                  });
                }}
              >
                {formData.popularity === "medium" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      width: 32,
                      height: 32,
                      bgcolor: theme.palette.warning.main,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 2px 8px ${alpha(theme.palette.warning.main, 0.4)}`,
                    }}
                  >
                    <FaCheck size={16} color="#ffffff" />
                  </Box>
                )}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.warning.main, 0.2),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaArrowTrendUp
                    size={20}
                    color={theme.palette.warning.main}
                  />
                </Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  textAlign="center"
                >
                  Media
                </Typography>
              </Box>
            </Grid>

            {/* Popularidad Alta */}
            <Grid size={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  borderRadius: 1.5,
                  border: `2px solid ${formData.popularity === "high" ? theme.palette.success.main : alpha(theme.palette.primary.main, 0.2)}`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                  },
                }}
                onClick={() => {
                  handleChange({
                    target: {
                      name: "popularity",
                      value: "high",
                    },
                  });
                }}
              >
                {formData.popularity === "high" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      width: 32,
                      height: 32,
                      bgcolor: theme.palette.success.main,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 2px 8px ${alpha(theme.palette.success.main, 0.4)}`,
                    }}
                  >
                    <FaCheck size={16} color="#ffffff" />
                  </Box>
                )}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.success.main, 0.2),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaArrowTrendUp
                    size={20}
                    color={theme.palette.success.main}
                  />
                </Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  textAlign="center"
                >
                  Alta
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};
