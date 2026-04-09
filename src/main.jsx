import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainApp from "./routes/MainApp";
import { ThemeProvider } from "@emotion/react";
import customTheme from "./hook/useCustomTheme";
import { CssBaseline } from "@mui/material";
import { BooProvider } from "./context/useBooContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BooProvider>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <MainApp />
    </ThemeProvider>
  </BooProvider>,
  // </StrictMode>,
);
