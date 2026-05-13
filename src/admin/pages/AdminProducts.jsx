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
import { getAllProductsWithInternal, archiveProduct } from "../api/api";
import ProductTableList from "../components/product/ProductTableList";
import ProductCardView from "../components/product/ProductCardView";
import SearchProductBar from "../components/product/SearchProductBar";
import ProductFilters from "../components/product/ProductFilters";
import DeleteConfirmationDialog from "../components/product/DeleteConfirmationDialog";
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
      const activeProducts = data.filter(
        (product) =>
          product.archived === false || product.archived === undefined,
      );
      setProducts(activeProducts);
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

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setViewOrEditMode("create");
    setDrawerOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
    setViewOrEditMode("edit");
    //console.log("Editar:", product);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const result = await archiveProduct(productToDelete.id);

      if (result.success) {
        // Actualizar la lista local removiendo el producto archivado
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productToDelete.id),
        );

        // Cerrar diálogo
        setDeleteDialogOpen(false);
        setProductToDelete(null);

        // Mostrar snackbar de éxito
        setSnackbar({
          open: true,
          message: "Producto archivado correctamente",
          severity: "success",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error archivando producto:", error);
      setSnackbar({
        open: true,
        message: error.message || "Error al archivar el producto",
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
        Gestión de Productos
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, sm: 8, md: 8, lg: 10 }}>
          <SearchProductBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FaPlus />}
            sx={{
              borderRadius: "50px",
            }}
            onClick={handleCreateProduct}
          >
            Crear Producto
          </Button>
        </Grid>
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
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <ProductTableList
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onRetry={fetchData}
          setSelectedProduct={setSelectedProduct}
          setViewOrEditMode={setViewOrEditMode}
          onEdit={handleEdit}
          onDelete={handleDelete}
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

      {/* Diálogo de confirmación para eliminar */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        product={productToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
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
