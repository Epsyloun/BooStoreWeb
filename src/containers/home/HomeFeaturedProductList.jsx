import { Container, Grid } from "@mui/material";
import React from "react";
import TitleComponent from "../../components/generic/TitleComponent";
import ProductElement from "../../components/home/ProductElement";
import logoBox from "../../assets/images/product_example.webp";

export default function HomeFeaturedProductList() {
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Container my={2}>
      <TitleComponent title="Productos destacados" />
      <Grid container spacing={2}>
        {products.map(() => {
          return (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
              }}
            >
              <ProductElement
                image={logoBox}
                title="Estuche Nintendo Switch"
                price="$24.99"
                onAdd={() => console.log("Añadir")}
                onView={() => console.log("Ver más")}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
