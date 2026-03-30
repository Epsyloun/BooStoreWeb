import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainApp from "./routes/MainApp";
import { ThemeProvider } from "@emotion/react";
import customTheme from "./hook/useCustomTheme";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <MainApp />
    </ThemeProvider>
  </StrictMode>,
);
