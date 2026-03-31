import { TextField, InputAdornment, useTheme, alpha } from "@mui/material";
import { FiSearch } from "react-icons/fi";

export default function MainSearchTextField() {
  const theme = useTheme();
  return (
    <TextField
      variant="outlined"
      placeholder="Buscar..."
      color="primary"
      autoComplete="off"
      sx={(theme) => ({
        "& .MuiOutlinedInput-root": {
          height: "50px",
          "& fieldset": {
            border: `1px solid ${alpha(theme.palette.white.main, 0.5)}`,
            transition: "border-color 0.25s ease",
            borderRadius: "50px",
          },
          "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
      })}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ marginRight: "8px" }}>
            <FiSearch color={theme.palette.white.main} />
          </InputAdornment>
        ),
      }}
    />
  );
}
