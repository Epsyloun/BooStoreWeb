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
  CircularProgress,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import BreadCrumbsNav from "../containers/BreadCrumbsNav";
import ProductElement from "../components/generic/ProductElement";
import { ProductSearchBar } from "../containers/product/ProductSearchBar";
import { ProductList } from "../containers/product/ProductList";
import { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useBooContext } from "../context/useBooContext";

export default function Products() {
  const { products, loading } = useBooContext();
  const navigate = useNavigate();

  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const categoryParam = parseInt(searchParams.get("category", 10));
  const searchParam = searchParams.get("search");
  const tagParam = parseInt(searchParams.get("tag"), 10);

  const [filters, setFilters] = useState({
    search: searchParam || "",
    category: categoryParam || 0,
    orderBy: tagParam || 0,
  });

  // Actualizar URL cuando cambian los filtros
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category !== 0) params.set("category", filters.category);
    if (filters.orderBy !== 0) params.set("tag", filters.orderBy);

    navigate(`/products?${params.toString()}`, { replace: true });
  }, [filters, navigate]);

  const filteredProductList = useMemo(
    () => products.filter((product) => product.visibility),
    [products],
  );

  const [filteredList, setFilteredList] = useState(filteredProductList);

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
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <ProductSearchBar
                filters={filters}
                setFilters={setFilters}
                originalProducts={filteredProductList}
                setFilteredList={setFilteredList}
              />
              <ProductList productList={filteredList} />
            </>
          )}
        </Container>
      </Box>
    </div>
  );
}
