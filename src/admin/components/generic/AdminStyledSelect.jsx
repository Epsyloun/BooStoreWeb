import {
  Select,
  MenuItem,
  Box,
  InputLabel,
  useTheme,
  alpha,
} from "@mui/material";

export default function AdminStyledSelect({
  label,
  value,
  onChange,
  options = [],
  labelColor,
  ...props
}) {
  const theme = useTheme();

  return (
    <Box>
      <InputLabel
        htmlFor="select-input"
        shrink
        sx={{
          color: labelColor || theme.palette.primary.light,
          fontWeight: 500,
          mb: 0.5,
          position: "static",
          transform: "none",
        }}
      >
        {label}
      </InputLabel>

      <Select
        id="select-input"
        value={value ?? ""}
        onChange={onChange}
        fullWidth
        {...props}
        sx={{
          backgroundColor: alpha(theme.palette.background.paper, 0.5),
          borderRadius: "8px",
          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor: alpha(theme.palette.background.paper, 0.7),
          },

          "&.Mui-focused": {
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
          },

          ...props?.sx,
        }}
      >
        <MenuItem value="" disabled>
          Seleccionar un lote...
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.id} value={option.title}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
