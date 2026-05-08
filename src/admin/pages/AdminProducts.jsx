import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getAllProductsWithInternal } from "../api/api";
import ProductTableList from "../components/product/ProductTableList";
import ProductCardView from "../components/product/ProductCardView";
import SearchProductBar from "../components/product/SearchProductBar";
import { useAuthContext } from "../context/useAuthContext";
import ViewOrEditProduct from "../layout/ViewOrEditProduct";

export default function AdminDashboard() {
  const { selectedProduct, setSelectedProduct } = useAuthContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewOrEditMode, setViewOrEditMode] = useState("view");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

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

  // Debounce para el término de búsqueda (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtrar productos por término de búsqueda
  const filteredProducts = products.filter((product) => {
    const searchLower = debouncedSearchTerm.toLowerCase();
    const titleMatch = product.title?.toLowerCase().includes(searchLower);
    const skuMatch = product.sku?.toLowerCase().includes(searchLower);
    return titleMatch || skuMatch;
  });

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

      <SearchProductBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {isMobile ? (
        <ProductCardView
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          setSelectedProduct={setSelectedProduct}
          setDrawerOpen={setDrawerOpen}
          setViewOrEditMode={setViewOrEditMode}
        />
      ) : (
        <ProductTableList
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          setSelectedProduct={setSelectedProduct}
          setDrawerOpen={setDrawerOpen}
          setViewOrEditMode={setViewOrEditMode}
        />
      )}

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
