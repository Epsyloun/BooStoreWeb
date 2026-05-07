import { TextField, Box, InputLabel, useTheme, alpha } from "@mui/material";

export default function AdminStyledTxt({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  labelColor,
  ...props
}) {
  const theme = useTheme();

  // Formato para campos numéricos
  const getPlaceholder = () => {
    if (type === "number" && !placeholder) {
      return "0.00";
    }
    return placeholder;
  };

  return (
    <Box>
      {/* LABEL SIEMPRE ARRIBA */}
      <InputLabel
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

      <TextField
        type={type}
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        onWheel={(e) => e.target.blur()}
        placeholder={getPlaceholder()}
        {...props}
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
              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
            },
          },
          // Remover spinners de inputs number
          ...(type === "number" && {
            "& input::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }),
        }}
      />
    </Box>
  );
}
