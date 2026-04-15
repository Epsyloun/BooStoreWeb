import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Navbar from "../containers/Navbar";
import Footer from "../containers/Footer";
import { PageWrapper } from "../components/animated/PageWrapper";
import Delivery from "../pages/Delivery";
import NotFound from "../pages/NotFound";
import { getProducts } from "../api";
import { useBooContext } from "../context/useBooContext";
import ProductDetails from "../pages/ProductDetails";

export default function MainApp() {
  const { handleProducts } = useBooContext();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        handleProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

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
            path="/products/:id"
            element={
              <PageWrapper>
                <ProductDetails />
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
          <Route
            path="/delivery"
            element={
              <PageWrapper>
                <Delivery />
              </PageWrapper>
            }
          />
          <Route
            path="*"
            element={
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            }
          />
        </Routes>
        <Footer />
      </Box>
    </HashRouter>
  );
}
