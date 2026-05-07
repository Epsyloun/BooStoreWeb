import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  useTheme,
} from "@mui/material";

const columns = [
  { id: "image", label: "Imagen", minWidth: 100, align: "center" },
  { id: "name", label: "Nombre", minWidth: 200 },
  { id: "sku", label: "SKU", minWidth: 120 },
  { id: "price", label: "Precio", minWidth: 120, align: "right" },
  { id: "discount", label: "Oferta", minWidth: 120, align: "right" },
  { id: "stock", label: "Stock", minWidth: 100, align: "center" },
  { id: "visibility", label: "Estado", minWidth: 110, align: "center" },
  { id: "actions", label: "Acciones", minWidth: 150, align: "center" },
];

export default function ProductTableSkeleton({ rows = 5 }) {
  const theme = useTheme();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="tabla de productos skeleton">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  <Skeleton variant="rounded" width={60} height={60} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width="80%" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width="70%" />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="text" width="60%" sx={{ ml: "auto" }} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="text" width="50%" sx={{ ml: "auto" }} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton variant="rounded" width={50} height={32} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton variant="rounded" width={70} height={32} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton
                    variant="rounded"
                    width={100}
                    height={32}
                    sx={{ mx: "auto" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
