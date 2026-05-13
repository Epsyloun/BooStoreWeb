import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
  alpha,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaChevronDown, FaChevronUp, FaSearch, FaTimes } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { categories } from "../../utils/categoriesAndTags";

const SORT_OPTIONS = [
  { value: "active-alpha", label: "Activos A-Z" },
  { value: "alpha-asc", label: "A-Z" },
  { value: "alpha-desc", label: "Z-A" },
  { value: "price-asc", label: "Más Barato" },
  { value: "price-desc", label: "Más Caro" },
];

const VISIBILITY_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "visible", label: "Visibles" },
  { value: "hidden", label: "Ocultos" },
];

const OFFER_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "with-offer", label: "Con Oferta" },
  { value: "without-offer", label: "Sin Oferta" },
];

const POPULARITY_OPTIONS = [
  { value: "all", label: "Todas" },
  { value: "high", label: "Alta" },
  { value: "medium", label: "Media" },
  { value: "low", label: "Baja" },
];

export default function ProductFilters({ onFiltersChange, totalProducts = 0 }) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    visibility: "all",
    offer: "all",
    popularity: "all",
    sort: "active-alpha",
  });

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      category: "all",
      visibility: "all",
      offer: "all",
      popularity: "all",
      sort: "active-alpha",
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const activeFilters = Object.values(filters).filter(
    (val) => val !== "all" && val !== "active-alpha",
  ).length;

  return (
    <Box
      sx={{
        bgcolor: alpha(theme.palette.primary.dark, 0.5),
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Header - Botón de expandir/colapsar */}
      <Box
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderBottom: isExpanded
            ? `1px solid ${theme.palette.divider}`
            : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
          },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <IoFilterSharp />
          <Typography variant="subtitle2" fontWeight="600">
            Filtros y Orden
          </Typography>
          {activeFilters > 0 && (
            <Box
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {activeFilters}
            </Box>
          )}
          <Typography variant="caption" color="textSecondary">
            ({totalProducts} productos)
          </Typography>
        </Stack>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {activeFilters > 0 && (
            <Button
              size="small"
              color="secondary"
              startIcon={<FaTimes />}
              onClick={(e) => {
                e.stopPropagation();
                handleResetFilters();
              }}
              variant="text"
            >
              Limpiar
            </Button>
          )}
          {isExpanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </Box>
      </Box>

      {/* Contenido - Filtros */}
      <Collapse in={isExpanded}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {/* Filtro de Categoría */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Categoría</InputLabel>
                <Select
                  label="Categoría"
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                >
                  <MenuItem value="all">Todas las categorías</MenuItem>
                  {Array.isArray(categories) &&
                    categories
                      .filter((cat) => cat.id !== 0)
                      .map((cat) => {
                        const catTitle = cat.title || cat.name || "Sin título";
                        return (
                          <MenuItem key={cat.id} value={cat.id}>
                            {catTitle}
                          </MenuItem>
                        );
                      })}
                </Select>
              </FormControl>
            </Grid>

            {/* Filtro de Visibilidad */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Visibilidad</InputLabel>
                <Select
                  label="Visibilidad"
                  value={filters.visibility}
                  onChange={(e) =>
                    handleFilterChange("visibility", e.target.value)
                  }
                >
                  {VISIBILITY_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Filtro de Ofertas */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Ofertas</InputLabel>
                <Select
                  label="Ofertas"
                  value={filters.offer}
                  onChange={(e) => handleFilterChange("offer", e.target.value)}
                >
                  {OFFER_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Filtro de Popularidad */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Popularidad</InputLabel>
                <Select
                  label="Popularidad"
                  value={filters.popularity}
                  onChange={(e) =>
                    handleFilterChange("popularity", e.target.value)
                  }
                >
                  {POPULARITY_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  label="Ordenar por"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange("sort", e.target.value)}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
}
