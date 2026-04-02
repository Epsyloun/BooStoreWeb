import { alpha, Breadcrumbs, Link, Typography, useTheme } from "@mui/material";
import { Link as LinkNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

export default function BreadCrumbsNav() {
  const theme = useTheme();
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<MdNavigateNext style={{ fontSize: "2em" }} />}
    >
      <Link component={LinkNavigate} underline="none" color="inherit" href="/">
        <Typography sx={{ ...styledSubLink(theme) }} variant="h6">
          Inicio
        </Typography>
      </Link>
      <Typography sx={{ color: "primary.main" }}>
        <Typography variant="h6">Productos</Typography>
      </Typography>
    </Breadcrumbs>
  );
}

const styledSubLink = (theme) => ({
  cursor: "pointer",
  position: "relative",
  px: 0,
  pb: 0,
  transition: "all 0.3s",
  "&:hover": {
    color: theme.palette.white.main,
    transform: "scale(1.1)",
    textShadow: `0 0 8px ${alpha(theme.palette.secondary.main, 0.8)}`,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 0,
    height: "2px",
    background: `linear-gradient(to right, ${theme.palette.white.main}, ${theme.palette.secondary.dark})`,
    transition: "width 0.3s",
  },
  "&:hover::before": {
    width: "100%",
  },
});
