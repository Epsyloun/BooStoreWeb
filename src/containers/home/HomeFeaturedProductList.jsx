import { Container, Grid, Fade, Box, Grow } from "@mui/material";
import React from "react";
import TitleComponent from "../../components/generic/TitleComponent";
import ProductElement from "../../components/generic/ProductElement";
import { useBooContext } from "../../context/useBooContext";

export default function HomeFeaturedProductList() {
  const { products } = useBooContext();
  const homeProducts = products.filter((product) => product.featured);
  const sortedProducts = homeProducts.sort((a, b) => a.productId - b.productId);

  return (
    <Container sx={{ my: 2 }}>
      <TitleComponent title="Productos destacados" />

      <Grid container spacing={2} justifyContent={"center"}>
        {sortedProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <ProductElement
              productInfo={product}
              onAdd={() => console.log("Añadir")}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
