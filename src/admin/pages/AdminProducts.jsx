import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { getAllProductsWithInternal } from "../api/api";
import ProductTableList from "../components/product/ProductTableList";
import { useAuthContext } from "../context/useAuthContext";
import ViewOrEditProduct from "../layout/ViewOrEditProduct";

export default function AdminDashboard() {
  const { selectedProduct, setSelectedProduct } = useAuthContext();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewOrEditMode, setViewOrEditMode] = useState("view");

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllProductsWithInternal();
      setProducts(data);
    } catch (err) {
      setError("Error al cargar los productos. Por favor, intenta de nuevo.");
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      bgcolor="background.adminBackground"
      color="background.contrastText"
      minHeight="100vh"
      px={4}
      py={4}
    >
      <Typography
        variant="h5"
        className="font-title"
        fontWeight={600}
        gutterBottom
      >
        Gestión de Productos
      </Typography>

      {/* <SearchProductAdmin /> */}
      <ProductTableList
        products={products}
        isLoading={isLoading}
        error={error}
        onRetry={fetchData}
        setSelectedProduct={setSelectedProduct}
        setDrawerOpen={setDrawerOpen}
        setViewOrEditMode={setViewOrEditMode}
      />

      {/* Drawer para editar producto */}
      <ViewOrEditProduct
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedProduct(null);
        }}
        viewOrEditMode={viewOrEditMode}
      />
    </Box>
  );
}
