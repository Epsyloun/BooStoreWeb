import {
  alpha,
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { categories, tags } from "../../utils/productsJson";

//TODO integrar filtros con JSON de producto real

export const ProductSearchBar = ({ originalProducts, setFilteredList }) => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    search: "",
    category: 0,
    orderBy: 0,
  });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters.search]);

  useEffect(() => {
    let result = [...originalProducts];

    //Buscar (usar debounce)
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();

      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchLower),
      );
    }

    //Categoría
    if (filters.category !== 0) {
      result = result.filter((product) =>
        product.categories.some((cat) => cat.id === filters.category),
      );
    }

    //Orden
    switch (filters.orderBy) {
      case 3:
        result.sort((a, b) => a.price - b.price);
        break;
      case 4:
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredList(result);
  }, [debouncedSearch, filters.category, filters.orderBy, originalProducts]);

  return (
    <Box
      bgcolor={alpha(theme.palette.background.grey, 0.5)}
      my={2}
      p={2}
      sx={{
        borderRadius: "50px",
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            name={"search"}
            id="product-textfield"
            fullWidth
            value={filters.search}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                py: 0.5,
                "& fieldset": {
                  border: `1px solid ${alpha(theme.palette.white.main, 0.5)}`,
                  transition: "border-color 0.25s ease",
                  borderRadius: "50px",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch
                    style={{
                      color: alpha(theme.palette.white.main, 0.5),
                      marginLeft: 4,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          size={{
            xs: 6,
            md: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ mt: 2, ml: 0.5 }}>
              Categoría
            </InputLabel>
            <Select
              name="category"
              id="category-select"
              color={"primary"}
              value={filters.category}
              onChange={handleChange}
              sx={{
                pt: 1,
                pl: 1,
                borderRadius: "50px",
                bgcolor: alpha(theme.palette.primary.dark, 0.5),
                transition: "all 0.3s ease",
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          size={{
            xs: 6,
            md: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ mt: 2, ml: 0.5 }}>
              Ordenar por
            </InputLabel>
            <Select
              name="orderBy"
              id="category-select"
              color={"primary"}
              value={filters.orderBy}
              onChange={handleChange}
              sx={{
                pt: 1,
                pl: 1,
                borderRadius: "50px",
                bgcolor: alpha(theme.palette.primary.dark, 0.5),
                transition: "all 0.3s ease",
              }}
            >
              {tags.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
