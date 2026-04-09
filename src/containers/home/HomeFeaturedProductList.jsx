import { Container, Grid, Fade, Box, Grow } from "@mui/material";
import React from "react";
import TitleComponent from "../../components/generic/TitleComponent";
import ProductElement from "../../components/generic/ProductElement";
import { useBooContext } from "../../context/useBooContext";

export default function HomeFeaturedProductList() {
  const { products } = useBooContext();
  const homeProducts = products.filter((product) => product.featured);
  return (
    <Container sx={{ my: 2 }}>
      <TitleComponent title="Productos destacados" />

      <Grid container spacing={2} justifyContent={"center"}>
        {homeProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
            <ProductElement
              productInfo={product}
              onAdd={() => console.log("Añadir")}
              onView={() => console.log("Ver más")}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
