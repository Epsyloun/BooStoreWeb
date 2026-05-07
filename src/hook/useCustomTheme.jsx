import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9929ea",
      light: "#c084fc",
      dark: "#6b21a8",
      background: "#1b0b1f",
      accent: "#431266",
    },
    secondary: {
      main: "#ff5fcf",
      light: "#ff9de0",
      dark: "#b92d95",
      accent: "#ba1287",
    },
    info: {
      main: "#2563eb", // tu tertiary
    },
    background: {
      default: "#0a0a0a",
      paper: "#1e293b",
      grey: "#222222",
      adminBackground: "#201130",
      adminBox: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cbd5e1",
      disabled: "#717171",
      primaryLight: "#dfc1fd",
      secondaryLight: "#fcc1e9",
    },
    white: {
      main: "#ffffff",
      dark: "#e5e5e5",
    },
  },
  typography: {
    fontFamily: "Manrope, sans-serif",
    h1: {
      fontFamily: "Space Grotesk, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Space Grotesk, sans-serif",
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
