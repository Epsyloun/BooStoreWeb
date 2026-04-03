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
import ProductElement from "../components/generic/ProductElement";
import { ProductSearchBar } from "../containers/product/ProductSearchBar";
import { ProductList } from "../containers/product/ProductList";
import { products } from "../utils/productsJson";
import { useState } from "react";

export default function Products() {
  const theme = useTheme();
  const [filteredList, setFilteredList] = useState(products);
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
          <ProductSearchBar
            originalProducts={products}
            setFilteredList={setFilteredList}
          />
          <ProductList productList={filteredList} />
        </Container>
      </Box>
    </div>
  );
}
