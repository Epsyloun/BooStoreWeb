import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Box,
  IconButton,
  useTheme,
  Typography,
  Stack,
  LinearProgress,
} from "@mui/material";
import { FaEdit, FaTrash, FaEye, FaRedoAlt } from "react-icons/fa";

import LazyImage from "../generic/LazyImage";
import ProductTableError from "./ProductTableError";
import ProductTableSkeleton from "./ProductTableSkeleton";
import { StockProgressBar } from "./StockProgressBar";

const columns = [
  { id: "image", label: "Imagen", minWidth: 100, align: "center" },
  { id: "name", label: "Nombre", minWidth: 200 },
  { id: "price", label: "Precio", minWidth: 120, align: "right" },
  { id: "popularity", label: "Popularidad", minWidth: 120, align: "center" },
  { id: "stock", label: "Stock", minWidth: 100, align: "center" },
  { id: "visibility", label: "Estado", minWidth: 110, align: "center" },
  { id: "actions", label: "Acciones", minWidth: 150, align: "center" },
];

export default function ProductTableList({
  products = [],
  isLoading = false,
  error = null,
  onRetry = () => {},
  setSelectedProduct = () => {},
  setViewOrEditMode = () => {},
  onEdit = () => {},
  onDelete = () => {},
  isArchived = false,
}) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Si hay error, mostrar componente de error
  if (error) {
    return <ProductTableError onRetry={onRetry} error={error} />;
  }

  // Si está cargando, mostrar skeleton
  if (isLoading) {
    return <ProductTableSkeleton rows={rowsPerPage} />;
  }

  // Si no hay productos, mostrar mensaje
  if (!products || products.length === 0) {
    return (
      <Paper sx={{ width: "100%", p: 4, textAlign: "center" }}>
        <Box sx={{ py: 4 }}>No hay productos disponibles</Box>
      </Paper>
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (product) => {
    onDelete(product);
  };

  const handleView = (product) => {
    //console.log("Ver:", product);
  };

  // Ordenar productos: primero activos, luego alfabéticamente
  const sortedProducts = [...products].sort((a, b) => {
    // Primero por visibilidad (activos primero)
    if (a.visibility !== b.visibility) {
      return a.visibility ? -1 : 1;
    }
    // Luego alfabéticamente por título
    return (a.title || "").localeCompare(b.title || "");
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
      <TableContainer
        sx={{
          maxHeight: "70svh",
        }}
      >
        <Table stickyHeader aria-label="tabla de productos">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.dark }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={() => onEdit(row)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell align="center">
                    <LazyImage
                      src={row.gridImage?.url || row.gridImage}
                      alt={row.title}
                      width={60}
                      height={60}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    <Stack>
                      <Typography fontWeight={"bold"} variant="body1">
                        {row.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.sku}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    <Stack spacing={0.5}>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: row.discountPrice
                            ? "line-through"
                            : "none",
                          color: row.discountPrice
                            ? theme.palette.text.disabled
                            : theme.palette.text.primary,
                          fontWeight: "bold",
                        }}
                      >
                        ${row.price.toFixed(2)}
                      </Typography>
                      {row.discountPrice && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: "bold",
                          }}
                        >
                          ${row.discountPrice.toFixed(2)}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={
                        row.popularity === "high"
                          ? "Alta"
                          : row.popularity === "medium"
                            ? "Media"
                            : "Baja"
                      }
                      size="small"
                      color={
                        row.popularity === "high"
                          ? "success"
                          : row.popularity === "medium"
                            ? "warning"
                            : "error"
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <StockProgressBar
                      stock={row.stock || 0}
                      initialStock={row.initialStock || 0}
                      theme={theme}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: row.visibility
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: row.visibility
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                        }}
                      >
                        {row.visibility ? "Visible" : "Oculto"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      {isArchived ? (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row);
                          }}
                          title="Reactivar"
                          sx={{
                            color: theme.palette.success.main,
                          }}
                        >
                          <FaRedoAlt size={16} />
                        </IconButton>
                      ) : (
                        <>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleView(row);
                            }}
                            title="Ver"
                            sx={{
                              color: theme.palette.primary.light,
                            }}
                          >
                            <FaEye size={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}
                            title="Editar"
                            sx={{
                              color: theme.palette.primary.light,
                            }}
                          >
                            <FaEdit size={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(row);
                            }}
                            title="Eliminar"
                            sx={{
                              color: theme.palette.primary.light,
                            }}
                          >
                            <FaTrash size={16} />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count}`
        }
        sx={{
          bgcolor: theme.palette.primary.dark,
          "& .MuiIconButton-root": {
            color: "#fff",
          },
          "& .MuiTablePagination-toolbar": {
            color: "#fff",
          },
          "& .MuiSelect-icon": {
            color: "#fff",
          },
        }}
      />
    </Paper>
  );
}
