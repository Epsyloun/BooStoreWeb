import React from "react";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { HeroSectionDelivery } from "../containers/delivery/HeroSectionDelivery";
import { CoverageSectionDelivery } from "../containers/delivery/CoverageSectionDelivery";
import { FixedPointSectionDelivery } from "../containers/delivery/FixedPointSectionDelivery";

//import { QRCodeSVG } from "qrcode.react";

const MAPS_API_KEY = "AIzaSyCnUxk-lPZSwR9ZQ4SmExdb1EII9RPnsY0";

export default function Delivery() {
  const theme = useTheme();
  return (
    <>
      <Box
        py={6}
        sx={{
          position: "relative",
          zIndex: 2,
          background: `linear-gradient(
      135deg,
      ${alpha(theme.palette.secondary.main, 0.4)} 0%,
      ${alpha(theme.palette.secondary.main, 0.2)} 50%,
      ${alpha(theme.palette.secondary.main, 0.4)} 100%
    )`,
        }}
      >
        <HeroSectionDelivery />

        <Box py={4} mt={4} bgcolor={alpha("#992DEA", 0.08)}>
          <CoverageSectionDelivery />
        </Box>
        <Box py={4}>
          <FixedPointSectionDelivery />
        </Box>
      </Box>
    </>
  );
}
