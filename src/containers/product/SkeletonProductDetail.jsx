import React from "react";
import { Container, Grid, Stack, Skeleton, Box } from "@mui/material";

export default function SkeletonProductDetail() {
  return (
    <Container>
      <Grid container spacing={2} py={2}>
        {/* Navegacion */}
        <Grid size={{ xs: 1, md: 1 }}>
          <Skeleton variant="rounded" sx={{ width: "100%", height: "20px" }} />
        </Grid>
        <Grid size={{ xs: 1, md: 1 }}>
          <Skeleton variant="rounded" sx={{ width: "100%", height: "20px" }} />
        </Grid>
        <Grid size={{ xs: 1, md: 1 }}>
          <Skeleton variant="rounded" sx={{ width: "100%", height: "20px" }} />
        </Grid>
        <Grid size={{ xs: 9, md: 9 }} />

        {/* Imagen */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "100%",
              aspectRatio: "4 / 3",
              borderRadius: 4,
            }}
          />
        </Grid>

        {/* Contenido */}
        <Grid size={{ xs: 12, md: 7 }}>
          {/* Chips de categorías */}
          <Stack direction="row" spacing={1} mb={2}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rounded" width={80} height={32} />
            ))}
          </Stack>

          {/* Título y precio*/}
          <Stack spacing={1} mb={2}>
            <Skeleton variant="text" sx={{ fontSize: "2.5rem", mb: 1 }} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "2.5rem", width: "15%" }}
            />
          </Stack>

          {/* Descripción */}
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "90%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "85%" }} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
