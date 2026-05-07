import { Box, LinearProgress, Typography } from "@mui/material";

// Componente para mostrar stock como LinearProgress
export const StockProgressBar = ({ stock = 0, initialStock = 0, theme }) => {
  const percentage = initialStock > 0 ? (stock / initialStock) * 100 : 0;

  // Crear degradado desde secondary hasta primary
  const getGradientColor = () => {
    return `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          textAlign: "right",
          fontWeight: "bold",

          color: theme.palette.text.primary,
        }}
      >
        {stock} / {initialStock}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={Math.min(percentage, 100)}
        sx={{
          height: 8,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          "& .MuiLinearProgress-bar": {
            backgroundImage: getGradientColor(),
            borderRadius: 2,
          },
        }}
      />
    </Box>
  );
};
