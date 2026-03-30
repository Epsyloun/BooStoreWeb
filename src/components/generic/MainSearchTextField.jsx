import { TextField, InputAdornment, useTheme } from "@mui/material";
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
          "& fieldset": {
            border: `1px solid ${theme.palette.white.main}`,
            transition: "border-color 0.25s ease",
            borderRadius: "8px",
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
