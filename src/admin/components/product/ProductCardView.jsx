import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
  Paper,
  Pagination,
  useTheme,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import LazyImage from "../generic/LazyImage";
import ProductTableError from "./ProductTableError";
import ProductTableSkeleton from "./ProductTableSkeleton";
import { StockProgressBar } from "./StockProgressBar";

export default function ProductCardView({
  products = [],
  isLoading = false,
  error = null,
  onRetry = () => {},
  setSelectedProduct = () => {},
  setDrawerOpen = () => {},
  setViewOrEditMode = () => {},
}) {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Si hay error, mostrar componente de error
  if (error) {
    return <ProductTableError onRetry={onRetry} error={error} />;
  }

  // Si está cargando, mostrar skeleton
  if (isLoading) {
    return <ProductTableSkeleton rows={itemsPerPage} />;
  }

  // Si no hay productos, mostrar mensaje
  if (!products || products.length === 0) {
    return (
      <Paper sx={{ width: "100%", p: 4, textAlign: "center" }}>
        <Box sx={{ py: 4 }}>No hay productos disponibles</Box>
      </Paper>
    );
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const handleDelete = (product) => {
    //console.log("Eliminar:", product);
  };

  const handleView = (product) => {
    //console.log("Ver:", product);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {displayedProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.5s ease",
              backgroundColor: alpha(theme.palette.background.default, 0.5),
              backdropFilter: "blur(10px)",
              border: `2px solid ${alpha(theme.palette.primary.main, 0.75)}`,
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.5)}`,
              },
            }}
          >
            {/* Imagen */}
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: alpha(
                  theme.palette.background.adminBackground,
                  0.5,
                ),
                pt: 2,
                px: 2,
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 1,
                  position: "relative",
                }}
              >
                <LazyImage
                  src={product.gridImage}
                  alt={product.title}
                  width="100%"
                  height="100%"
                  style={{
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    display: "block",
                    width: "100%",
                  }}
                />

                {/* Badge de oferta */}
                {product.discountPrice && (
                  <Chip
                    label="OFERTA"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: theme.palette.error.main,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                )}

                {/* Badge de visibilidad */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: product.visibility
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#fff",
                      fontWeight: "500",
                    }}
                  >
                    {product.visibility ? "Visible" : "Oculto"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Contenido */}
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                py: 2,
              }}
            >
              {/* Nombre y SKU */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  lineHeight: 1.2,
                  color: "white.main",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.title}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                SKU: {product.sku}
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              {/* Precios y Stock */}
              <Stack spacing={1.5}>
                {/* Precios */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {product.discountPrice ? (
                    <>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 700,
                        }}
                      >
                        ${product.discountPrice.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.disabled,
                          textDecoration: "line-through",
                          fontWeight: 400,
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                  )}
                </Stack>

                {/* Stock */}
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Stock
                  </Typography>
                  <StockProgressBar
                    stock={product.stock || 0}
                    initialStock={product.initialStock || 0}
                    theme={theme}
                  />
                </Box>

                {/* Acciones */}
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton
                    size="small"
                    onClick={() => handleView(product)}
                    title="Ver"
                    sx={{
                      color: theme.palette.primary.light,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                      borderRadius: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: `1px solid ${alpha(theme.palette.primary.main, 1)}`,
                      },
                    }}
                  >
                    <FaEye size={14} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(product)}
                    title="Editar"
                    sx={{
                      color: theme.palette.primary.light,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                      borderRadius: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: `1px solid ${alpha(theme.palette.primary.main, 1)}`,
                      },
                    }}
                  >
                    <FaEdit size={14} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(product)}
                    title="Eliminar"
                    sx={{
                      color: theme.palette.primary.light,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                      borderRadius: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: `1px solid ${alpha(theme.palette.primary.main, 1)}`,
                      },
                    }}
                  >
                    <FaTrash size={14} />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Paginación */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                borderColor: theme.palette.primary.main,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
