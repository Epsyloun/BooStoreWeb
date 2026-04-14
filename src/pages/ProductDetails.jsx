import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooContext } from "../context/useBooContext";
import {
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ImageBox from "../components/generic/ImageBox";
const placeholderImage =
  "https://firebasestorage.googleapis.com/v0/b/boo-store-cc6e5.firebasestorage.app/o/generic%2Fplaceholder.webp?alt=media&token=01f4b878-afdf-4786-bee4-7a8b3d09a950";

export default function ProductDetails() {
  const theme = useTheme();
  const { id } = useParams();
  const { products, loading } = useBooContext();

  const product = products.find((p) => String(p.id) === id);

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };

  if (loading) {
    return (
      <Container>
        <Typography>Cargando detalles del producto...</Typography>
      </Container>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Container>
        <Typography>No hay productos disponibles</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography>Producto no encontrado</Typography>
      </Container>
    );
  }

  const {
    title,
    description,
    images,
    categories,
    price,
    discountPrice,
  } = product;
  const productImage =
    getProductDetails(id)?.images[0]?.url || placeholderImage;
  const doublePice = price?.toFixed(2);
  const doubleDiscountPrice = discountPrice?.toFixed(2);

  const isInOffer = discountPrice === null ? false : true;

  return (
    <Container>
      <Grid container spacing={2} py={2}>
        <Grid size={{ xs: 12, md: 12 }}></Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <ImageBox src={productImage} alt="Product Image" />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          {categories &&
            categories.map((category) => (
              <Chip
                color="primary"
                variant="outlined"
                key={category.id}
                label={category.title}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          <Typography
            variant="h3"
            fontWeight={"bold"}
            fontFamily={"Khand"}
            py={1}
          >
            {title || "Título del Producto"}
          </Typography>
          <Stack
            direction={"row"}
            spacing={1}
            justifyContent={"flex-start"}
            alignItems={"baseline"}
            mb={2}
          >
            {isInOffer && (
              <Typography
                variant="h4"
                component="span"
                sx={{
                  display: "inline-block",
                  lineHeight: 1,
                  color: theme.palette.secondary.main,
                  fontWeight: 700,
                }}
              >
                ${doubleDiscountPrice}
              </Typography>
            )}
            <Typography
              variant={isInOffer ? "h5" : "h4"}
              component="span"
              sx={{
                display: "inline-block",
                lineHeight: 1,
                color: isInOffer
                  ? theme.palette.text.disabled
                  : theme.palette.primary.main,
                pl: isInOffer ? 1 : 0,
                textDecoration: isInOffer ? "line-through" : null,
                fontWeight: isInOffer ? 400 : 700,
              }}
            >
              ${doublePice}
            </Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {description || "Descripción del Producto"}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
