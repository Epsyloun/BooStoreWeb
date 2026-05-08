import React from "react";
import { TextField, InputAdornment, Box, useTheme, alpha } from "@mui/material";
import { FaSearch } from "react-icons/fa";

export default function SearchProductBar({ searchTerm, onSearchChange }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder="Buscar por título o SKU..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch size={16} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: alpha(theme.palette.background.paper, 0.5),
            borderRadius: "50px",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
            },
            "&.Mui-focused": {
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
            },
          },
        }}
      />
    </Box>
  );
}
