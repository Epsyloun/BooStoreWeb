import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { getAllProductsWithInternal, unarchiveProduct } from "../api/api";
import ProductTableList from "../components/product/ProductTableList";
import ProductCardView from "../components/product/ProductCardView";
import SearchProductBar from "../components/product/SearchProductBar";
import ProductFilters from "../components/product/ProductFilters";
import DeleteConfirmationDialog from "../components/product/DeleteConfirmationDialog";
import { useAuthContext } from "../context/useAuthContext";
import ViewOrEditProduct from "../layout/ViewOrEditProduct";

export default function AdminArchivedProducts() {
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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    visibility: "all",
    offer: "all",
    popularity: "all",
    sort: "active-alpha",
  });

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllProductsWithInternal();
      const archivedProducts = data.filter(
        (product) => product.archived === true,
      );
      setProducts(archivedProducts);
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

  // Filtrar y ordenar productos
  const filteredProducts = products
    .filter((product) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      const titleMatch = product.title?.toLowerCase().includes(searchLower);
      const skuMatch = product.sku?.toLowerCase().includes(searchLower);
      const searchPasses = titleMatch || skuMatch;

      // Filtro de categoría
      const categoryPasses =
        filters.category === "all" ||
        (product.categories &&
          product.categories.some((cat) => cat.id === filters.category));

      // Filtro de visibilidad
      const visibilityPasses =
        filters.visibility === "all" ||
        (filters.visibility === "visible" && product.visibility) ||
        (filters.visibility === "hidden" && !product.visibility);

      // Filtro de ofertas
      const offerPasses =
        filters.offer === "all" ||
        (filters.offer === "with-offer" && product.discountPrice) ||
        (filters.offer === "without-offer" && !product.discountPrice);

      // Filtro de popularidad
      const popularityPasses =
        filters.popularity === "all" ||
        product.popularity === filters.popularity;

      return (
        searchPasses &&
        categoryPasses &&
        visibilityPasses &&
        offerPasses &&
        popularityPasses
      );
    })
    .sort((a, b) => {
      // Ordenamiento
      switch (filters.sort) {
        case "alpha-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "alpha-desc":
          return (b.title || "").localeCompare(a.title || "");
        case "price-asc": {
          const priceA = a.discountPrice || a.price || 0;
          const priceB = b.discountPrice || b.price || 0;
          return priceA - priceB;
        }
        case "price-desc": {
          const priceA = a.discountPrice || a.price || 0;
          const priceB = b.discountPrice || b.price || 0;
          return priceB - priceA;
        }
        case "active-alpha":
        default:
          // Primero activos, luego alfabéticamente
          if (a.visibility !== b.visibility) {
            return a.visibility ? -1 : 1;
          }
          return (a.title || "").localeCompare(b.title || "");
      }
    });

  const handleNotification = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const result = await unarchiveProduct(productToDelete.id);

      if (result.success) {
        // Actualizar la lista local removiendo el producto devuelto
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productToDelete.id),
        );

        // Cerrar diálogo
        setDeleteDialogOpen(false);
        setProductToDelete(null);

        // Mostrar snackbar de éxito
        setSnackbar({
          open: true,
          message: "Producto devuelto correctamente",
          severity: "success",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error devolviendo producto:", error);
      setSnackbar({
        open: true,
        message: error.message || "Error al devolver el producto",
        severity: "error",
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <Box
      bgcolor="background.adminBackground"
      color="background.contrastText"
      minHeight="100vh"
      px={4}
      py={2}
    >
      <Typography
        variant="h5"
        className="font-title"
        fontWeight={600}
        gutterBottom
      >
        Devolver Productos Archivados
      </Typography>

      <Grid container spacing={2} mb={2}>
        {/* Filtros */}
        <Grid size={{ xs: 12 }}>
          <ProductFilters
            onFiltersChange={setFilters}
            totalProducts={filteredProducts.length}
          />
        </Grid>
      </Grid>

      {isMobile ? (
        <ProductCardView
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          setSelectedProduct={setSelectedProduct}
          setViewOrEditMode={setViewOrEditMode}
          onDelete={handleDelete}
          isArchived={true}
        />
      ) : (
        <ProductTableList
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          setSelectedProduct={setSelectedProduct}
          setViewOrEditMode={setViewOrEditMode}
          onDelete={handleDelete}
          isArchived={true}
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
        onNotification={handleNotification}
      />

      {/* Diálogo de confirmación para eliminar */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title="¿Devolver producto?"
        subtitle={`¿Estás seguro de que quieres devolver el producto ${productToDelete?.title}? Esta acción no se puede deshacer fácilmente.`}
        product={productToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        color="success"
        buttonText="Devolver"
      />

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
