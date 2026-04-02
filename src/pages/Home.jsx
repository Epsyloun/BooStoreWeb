import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import BannerHome from "../components/home/BannerHome";
import HomeCategoryList from "../containers/home/HomeCategoryList";
import HomeFeaturedProductList from "../containers/home/HomeFeaturedProductList";

export default function Home() {
  const theme = useTheme();
  return (
    <Box>
      <Box component="main">
        <Box
          pb={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            gap: 2,
            background: `linear-gradient(
      135deg,
      ${alpha(theme.palette.secondary.main, 0.5)} 0%,
      ${alpha(theme.palette.background.default, 0.1)} 30%,
      ${alpha(theme.palette.primary.main, 0.5)} 100%
    )`,
          }}
        >
          <BannerHome />
          <HomeCategoryList />
          <HomeFeaturedProductList />
        </Box>
      </Box>
    </Box>
  );
}
