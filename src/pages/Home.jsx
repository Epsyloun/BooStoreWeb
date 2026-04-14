import { Box, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import BannerHome from "../components/home/BannerHome";
import HomeCategoryList from "../containers/home/HomeCategoryList";
import HomeFeaturedProductList from "../containers/home/HomeFeaturedProductList";
import {
  casesArray,
  mochilasArray,
  products,
  sliderArray,
} from "../utils/productsJson";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../api";

const addProducts = async (products) => {
  try {
    for (const product of products) {
      await addDoc(collection(db, "productos"), product);
      console.log("Producto añadido:", product.title);
    }
    console.log("Todos los productos fueron añadidos");
  } catch (error) {
    console.error("Error al añadir productos:", error);
  }
};

export default function Home() {
  const theme = useTheme();
  return (
    <Box>
      <Box component="main">
        <Box
          pb={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            gap: 2,
            background: `linear-gradient(
      135deg,
      ${alpha(theme.palette.primary.main, 0.5)} 0%,
      ${alpha(theme.palette.primary.main, 0.6)} 50%,
      ${alpha(theme.palette.secondary.main, 0.6)} 100%
    )`,
          }}
        >
          <BannerHome />
          <HomeCategoryList />
          <HomeFeaturedProductList />
          {/* <AddProductsComponent /> */}
        </Box>
      </Box>
    </Box>
  );
}

const AddProductsComponent = () => {
  return (
    <Box>
      añadir productos (TEST)
      <Button onClick={() => addProducts(sliderArray)}>Añadir productos</Button>
    </Box>
  );
};
