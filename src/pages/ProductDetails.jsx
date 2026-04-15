import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooContext } from "../context/useBooContext";
import {
  Box,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material";
import ImageBox from "../components/generic/ImageBox";
import { BiBorderRadius } from "react-icons/bi";
import SkeletonProductDetail from "../containers/product/SkeletonProductDetail";
import { Skeleton } from "@mui/material";
import ProductNotFound from "../containers/product/ProductNotFound";
import ImageCarousel from "../components/product/ImageCarousel";
const placeholderImage =
  "https://firebasestorage.googleapis.com/v0/b/boo-store-cc6e5.firebasestorage.app/o/generic%2Fplaceholder.webp?alt=media&token=01f4b878-afdf-4786-bee4-7a8b3d09a950";

export default function ProductDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams();
  const { products, loading } = useBooContext();
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find((p) => String(p.id) === id);

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };

  if (loading) {
    return (
      <Container>
        <SkeletonProductDetail />
      </Container>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Container>
        <ProductUnavailable
          title="Producto No Disponible"
          subtitle="El producto que estás buscando está temporalmente agotado o no disponible."
        />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <ProductNotFound
          title="Producto No Encontrado"
          subtitle="El producto que estás buscando no existe o no está disponible."
        />
      </Container>
    );
  }

  const { title, description, categories, price, discountPrice, images } =
    product;
  const productImage =
    getProductDetails(id)?.images[selectedImageIndex]?.url || placeholderImage;
  const doublePice = price?.toFixed(2);
  const doubleDiscountPrice = discountPrice?.toFixed(2);

  const isInOffer = discountPrice === null ? false : true;

  return (
    <Container>
      <Grid container spacing={2} py={2}>
        <Grid
          size={{ xs: 12, sm: 12, md: 1 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            order: isMobile ? 2 : 1,
          }}
        >
          {images && images.length > 0 && (
            <ImageCarousel
              images={images}
              selectedIndex={selectedImageIndex}
              onSelectImage={setSelectedImageIndex}
            />
          )}
        </Grid>
        <Grid
          size={{ xs: 12, sm: 4, md: 5 }}
          sx={{
            display: "flex",
            order: isMobile ? 1 : 2,
          }}
        >
          {imageLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                height: "400px",
                aspectRatio: "4 / 3",
                borderRadius: 4,
              }}
            />
          )}
          <Box sx={{ position: "relative", width: "100%" }}>
            <Fade key={selectedImageIndex} in={!imageLoading} timeout={500}>
              <Box>
                <ImageBox
                  src={productImage}
                  alt="Product Image"
                  timeout={250}
                  onLoad={() => setImageLoading(false)}
                  sx={{ borderRadius: 4 }}
                />
              </Box>
            </Fade>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 8, md: 6 }}
          mt={isMobile ? 0 : 4}
          sx={{
            display: "flex",
            flexDirection: "column",
            order: 3,
          }}
        >
          <Stack direction="row" spacing={1}>
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
          </Stack>
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
