import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { AboutDivider } from "../assets/SvgsComponents";

export default function About() {
  return (
    <Box py={4}>
      <HeroSectionAbout />
      <DividerSectionAbout />
      <CategorySectionAbout />
      <DividerSectionAbout rotate={"180deg"} />
    </Box>
  );
}

export const HeroSectionAbout = () => {
  return (
    <Container>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Box bgcolor={"secondary.dark"} width={"100%"} height={"400px"} />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography variant="h2" color="white">
            Este es el titulo
          </Typography>
          <Typography variant="h6" color="white">
            Este es la descripción de que es Boo Store
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export const DividerSectionAbout = ({ rotate = "0deg" }) => {
  return (
    <Stack sx={{ zIndex: 10, pointerEvents: "none" }}>
      <AboutDivider
        style={{
          width: "100%",
          height: "100px",
          display: "block",
          zIndex: 12,
          transform: `rotate(${rotate})`,
        }}
      />
    </Stack>
  );
};

export const CategorySectionAbout = () => {
  return (
    <Grid container sx={{ my: "-100px" }}>
      <Grid size={4}>
        <Box
          bgcolor="primary.main"
          pt={"100px"}
          pb={"200px"}
          sx={{
            minHeight: "80svh",
            height: "auto",
          }}
        >
          <Typography align="center" variant="h5" color="white" py={2}>
            Conoce nuestras categorías
          </Typography>
        </Box>
      </Grid>

      <Grid size={8}>
        <Box
          bgcolor="secondary.main"
          pt={"100px"}
          pb={"200px"}
          sx={{
            minHeight: "80svh",
            height: "auto",
          }}
        >
          <Typography align="center" variant="h5" color="white" py={2}>
            Fondo con patrón
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
