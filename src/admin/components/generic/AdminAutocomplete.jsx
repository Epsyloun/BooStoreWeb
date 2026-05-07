import React from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";

export default function AdminAutocomplete({
  label,
  name,
  value,
  onChange,
  options,
  multiple = false,
  placeholder = "Selecciona o escribe...",
  size = "small",
  disabled = false,
  error = false,
  helperText = "",
}) {
  const theme = useTheme();

  // Convertir valor a array si es múltiple
  const normalizedValue = multiple
    ? Array.isArray(value)
      ? value
      : value
        ? [value]
        : []
    : value || null;

  const handleChange = (event, newValue) => {
    onChange({
      target: {
        name,
        value: multiple ? newValue : newValue,
      },
    });
  };

  // Función para obtener el label de una opción
  const getOptionLabelFn = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option && typeof option === "object") {
      return option.title || option.label || JSON.stringify(option);
    }
    return "";
  };

  // Función para comparar si dos opciones son iguales
  const isOptionEqualToValueFn = (option, val) => {
    if (typeof option === "string" && typeof val === "string") {
      return option === val;
    }
    if (typeof option === "object" && typeof val === "object") {
      return option?.id === val?.id || option?.title === val?.title;
    }
    if (typeof option === "object" && typeof val === "string") {
      return option?.title === val;
    }
    return option === val;
  };

  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontWeight: "500",
            color: theme.palette.primary.light,
          }}
        >
          {label}
        </Typography>
      )}
      <Autocomplete
        multiple={multiple}
        options={options}
        value={normalizedValue}
        onChange={handleChange}
        disabled={disabled}
        freeSolo={true}
        fullWidth
        size={size}
        getOptionLabel={getOptionLabelFn}
        isOptionEqualToValue={isOptionEqualToValueFn}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                borderRadius: "8px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.7),
                },
                "&.Mui-focused": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  boxShadow: `0 0 0 2px ${alpha(
                    theme.palette.primary.main,
                    0.1,
                  )}`,
                },
              },
              "& .MuiInputBase-input": {
                color: theme.palette.text.primary,
              },
              "& .MuiInputBase-input::placeholder": {
                color: alpha(theme.palette.text.secondary, 0.7),
                opacity: 1,
              },
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.5,
                mr: 0.5,
                mb: 0.5,
                borderRadius: "20px",
                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                color: theme.palette.primary.main,
                fontSize: "0.875rem",
                fontWeight: "500",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
              {...getTagProps({ index })}
            >
              {typeof option === "string"
                ? option
                : option?.title || option?.label || JSON.stringify(option)}
              <span
                style={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  lineHeight: "1",
                  marginLeft: "4px",
                }}
              >
                ×
              </span>
            </Box>
          ))
        }
        slotProps={{
          paper: {
            sx: {
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              backgroundImage: `linear-gradient(${alpha(
                theme.palette.primary.main,
                0.05,
              )}, ${alpha(theme.palette.primary.main, 0.05)})`,
            },
          },
        }}
        sx={{
          width: "100%",
        }}
      />
    </Box>
  );
}
