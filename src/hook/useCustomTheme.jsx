import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let customTheme = createTheme({
  palette: {
    primary: {
      main: "#9929ea",
      light: "#c084fc",
      dark: "#6b21a8",
    },
    secondary: {
      main: "#ff5fcf",
      light: "#ff9de0",
      dark: "#b92d95",
    },
    info: {
      main: "#2563eb", // tu tertiary
    },
    background: {
      default: "#0a0a0a",
      paper: "#1e293b",
      grey: "#222222",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cbd5e1",
      disabled: "#717171",
    },
    white: {
      main: "#ffffff",
      dark: "#e5e5e5",
    },
  },
  typography: {
    fontFamily: "Switzer, sans-serif",
    h1: {
      fontFamily: "Switzer, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Switzer, sans-serif",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

customTheme = responsiveFontSizes(customTheme);

export default customTheme;
