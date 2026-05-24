import { Container, Grid, Fade, Box, Grow } from "@mui/material";
import React from "react";
import TitleComponent from "../../components/generic/TitleComponent";
import ProductElement from "../../components/generic/ProductElement";
import { useBooContext } from "../../context/useBooContext";
import HomeSkeletonList from "./HomeSkeletonList";

export default function HomeFeaturedProductList() {
  const { products, loading } = useBooContext();
  const homeProducts = products.filter((product) => product.featured);

  return (
    <Container sx={{ my: 2 }}>
      <TitleComponent title="Productos destacados" />

      {loading ? (
        <HomeSkeletonList />
      ) : (
        <Grid container spacing={2} justifyContent={"center"}>
          {homeProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
              <ProductElement
                productInfo={product}
                onAdd={() => console.log("Añadir")}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
