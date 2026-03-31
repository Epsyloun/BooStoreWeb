import React, { useRef, useState } from "react";
import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Navbar from "../containers/Navbar";
import Footer from "../containers/Footer";

/**
 * Layout principal
 * Aquí vive toda la lógica visual (footer “detrás”)
 */
const MainLayout = () => {
  const [footerHeight, setFooterHeight] = useState(0);
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* CONTENIDO (capa superior) */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          mb: `${footerHeight}px`,
          backgroundColor: "background.default",
        }}
      >
        <Navbar />
        <Outlet />
      </Box>

      {/* FOOTER (capa inferior fija) */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1,
        }}
      >
        <Footer setFooterHeight={setFooterHeight} />
      </Box>
    </Box>
  );
};

/**
 * App principal
 */
export default function MainApp() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:category"
            element={<h1>Product category</h1>}
          />
          <Route path="/products/:id" element={<h1>Product Details</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
