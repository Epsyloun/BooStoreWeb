import React from "react";
import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Navbar from "../containers/Navbar";
import Footer from "../containers/Footer";
import { PageWrapper } from "../components/animated/PageWrapper";

export default function MainApp() {
  return (
    <HashRouter>
      <Box>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/products"
            element={
              <PageWrapper>
                <Products />
              </PageWrapper>
            }
          />
          <Route
            path="/products/:category"
            element={
              <PageWrapper>
                <h1>Product category</h1>
              </PageWrapper>
            }
          />
          <Route
            path="/products/:id"
            element={
              <PageWrapper>
                <h1>Product Details</h1>
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
        </Routes>
        <Footer />
      </Box>
    </HashRouter>
  );
}
