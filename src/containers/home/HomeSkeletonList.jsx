import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function HomeSkeletonList() {
  return (
    <Grid
      container
      direction={"row"}
      spacing={2}
      justifyContent={"center"}
      flexWrap={"wrap"}
    >
      {[...Array(8)].map((_, index) => (
        <Grid key={index} size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
          <Skeleton key={index} variant="rounded" width={"100%"} height={350} />
        </Grid>
      ))}
    </Grid>
  );
}
