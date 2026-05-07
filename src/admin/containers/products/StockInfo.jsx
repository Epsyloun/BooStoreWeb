import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import { TitleSection } from "../../components/product/generalInfo";
import { MdContentPasteGo } from "react-icons/md";

export const StockInfo = ({ formData, handleChange }) => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={alpha(theme.palette.background.adminBox, 0.5)}
      p={4}
      borderRadius={2}
    >
      <style>{`
        .stock-input-wrapper input[type="number"]::-webkit-outer-spin-button,
        .stock-input-wrapper input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
          display: none;
        }
        .stock-input-wrapper input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      <TitleSection
        title="Stock"
        subtitle="Datos de stock para gestión interna"
        icon={
          <MdContentPasteGo size={24} color={theme.palette.primary.light} />
        }
        bgcolor={alpha(theme.palette.primary.main, 0.25)}
      />
      <Stack spacing={2} mt={2}>
        <Box
          className="stock-input-wrapper"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            p: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.3),
            borderRadius: 1.5,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              borderColor: alpha(theme.palette.primary.main, 0.3),
            },
            "&:focus-within": {
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.2)}`,
            },
          }}
        >
          <input
            type="number"
            value={formData.stock || ""}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "stock",
                  value: e.target.value,
                },
              })
            }
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              fontSize: "2rem",
              fontWeight: "600",
              textAlign: "center",
              color: theme.palette.primary.main,
              width: "80px",
              cursor: "text",
              fontFamily: "inherit",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />
          <Typography
            variant="h4"
            fontWeight="600"
            color="primary"
            sx={{ userSelect: "none" }}
          >
            /
          </Typography>
          <input
            type="number"
            value={formData.initialStock || ""}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "initialStock",
                  value: e.target.value,
                },
              })
            }
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              fontSize: "2rem",
              fontWeight: "600",
              textAlign: "center",
              color: alpha(theme.palette.primary.main, 0.6),
              width: "80px",
              cursor: "text",
              fontFamily: "inherit",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="caption" color="text.secondary" align="center">
            Stock Actual
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center">
            Stock Inicial
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
