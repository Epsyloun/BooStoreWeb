import {
  alpha,
  Breadcrumbs,
  Container,
  Link,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import BreadCrumbsNav from "../containers/BreadCrumbsNav";
import ProductElement from "../components/home/ProductElement";

export default function Products() {
  const theme = useTheme();
  return (
    <div>
      <Box
        component="main"
        pb={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          gap: 2,

          background: `linear-gradient(
      -100deg,
      ${alpha(theme.palette.secondary.main, 0.5)} 0%,
      ${alpha(theme.palette.background.default, 0.1)} 30%,
      ${alpha(theme.palette.primary.main, 0.5)} 100%
    )`,
        }}
      >
        <Container sx={{ py: 2 }}>
          <BreadCrumbsNav />
          <ProductSearchBar />
          <ProductList />
        </Container>
      </Box>
    </div>
  );
}

const ProductSearchBar = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    search: "",
    category: 0,
    orderBy: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          size={{
            xs: 6,
            md: 2,
          }}
        >
          {" "}
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

import logoBox from "../assets/images/product_example.webp";
import { memo, useState } from "react";

const ProductList = memo(() => {
  const productList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Grid container pb={2} spacing={2}>
      {productList.map(() => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ProductElement
            image={logoBox}
            title="Estuche Nintendo Switch"
            price="$24.99"
            onAdd={() => console.log("Añadir")}
            onView={() => console.log("Ver más")}
          />
        </Grid>
      ))}
    </Grid>
  );
});
