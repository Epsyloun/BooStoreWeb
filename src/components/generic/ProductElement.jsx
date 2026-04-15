import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Fade,
  CardActionArea,
  Chip,
  Stack,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useInView } from "../../hook/useInView";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../../assets/images/placeholder.webp";
import { FiShoppingCart } from "react-icons/fi"; // o "react-icons/fa" para Font Awesome

export default function ProductElement({ productInfo, onAdd, onView }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [disableRipple, setDisableRipple] = useState(false);
  const { ref, inView } = useInView({
    once: true,
    threshold: 0.2,
  });

  const handleAddMouseDown = (e) => {
    e.stopPropagation();
    setDisableRipple(true);
  };

  const handleAddMouseUp = (e) => {
    e.stopPropagation();
    setDisableRipple(false);
  };

  const handleClickOnAdd = (e) => {
    e.stopPropagation();
    console.log("añadido");
  };

  const { title, gridImage, price, discountPrice } = productInfo;

  const doublePice = price?.toFixed(2);
  const doubleDiscountPrice = discountPrice?.toFixed(2);

  const isInOffer = discountPrice === null ? false : true;

  const navigateToDetails =
    onView ||
    (() => {
      navigate("/products/" + productInfo.id);
    });

  return (
    <Box ref={ref} sx={{ display: "flex", height: "100%" }}>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.5s ease",
          backgroundColor: alpha(theme.palette.background.default, 0.5),
          backdropFilter: "blur(10px)",
          transform: inView ? "translateY(0)" : "translateY(30px)",
          opacity: inView ? 1 : 0,
          display: "flex",
          flexDirection: "column",

          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.5)}`,
          },
        }}
      >
        <CardActionArea
          onClick={navigateToDetails}
          disableRipple={disableRipple}
          sx={{
            color: "primary.main",
            flex: 1,
            borderRadius: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {/* Imagen */}
          <Box
            sx={{
              pt: isMobile ? 1 : 2,
              pl: isMobile ? 1 : 2,
              pr: isMobile ? 1 : 2,
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={gridImage || placeholderImage}
              alt={title}
              loading="lazy"
              sx={{
                width: "100%",
                aspectRatio: "4 / 3",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Contenido */}
          <CardContent
            sx={{
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                lineHeight: 1.2,
                color: "white.main",
              }}
            >
              {title}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction={"row"} spacing={1} alignItems="center">
              {isInOffer && (
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontWeight: 700,
                  }}
                >
                  ${doubleDiscountPrice}
                </Typography>
              )}
              <Typography
                variant="h6"
                sx={{
                  color: isInOffer
                    ? theme.palette.text.disabled
                    : theme.palette.primary.main,
                  textDecoration: isInOffer ? "line-through" : null,
                  fontWeight: isInOffer ? 400 : 700,
                }}
              >
                ${doublePice}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              {isMobile ? (
                <IconButton
                  variant="outlined"
                  color="primary"
                  size="small"
                  onMouseDown={handleAddMouseDown}
                  onMouseUp={handleAddMouseUp}
                  onClick={handleClickOnAdd}
                  sx={{
                    ml: "auto",
                    textTransform: "none",
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                    borderRadius: 12,
                    px: 2,
                    transition: "all 0.5s ease",

                    "&:hover": {
                      border: `1px solid ${alpha(theme.palette.primary.main, 1)}`,
                    },
                  }}
                >
                  <FiShoppingCart />
                </IconButton>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  onMouseDown={handleAddMouseDown}
                  onMouseUp={handleAddMouseUp}
                  onClick={handleClickOnAdd}
                  startIcon={<FiShoppingCart />}
                  sx={{
                    ml: "auto",
                    textTransform: "none",
                    borderRadius: 12,
                    px: 2,
                  }}
                >
                  Añadir
                </Button>
              )}
            </Stack>
            {/* Botones */}
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
