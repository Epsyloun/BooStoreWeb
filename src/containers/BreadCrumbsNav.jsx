import { alpha, Breadcrumbs, Link, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

export default function BreadCrumbsNav({ childs = [], lastChild = null }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<MdNavigateNext style={{ fontSize: "2em" }} />}
    >
      <Link underline="none" color="inherit" onClick={goHome}>
        <Typography sx={{ ...styledSubLink(theme) }} variant="body1">
          Inicio
        </Typography>
      </Link>
      {Array.isArray(childs) &&
        childs.length > 0 &&
        childs.map((child) => (
          <Link
            key={child?.title}
            underline="none"
            color="inherit"
            onClick={() => navigate(child?.url || "#")}
          >
            <Typography sx={{ ...styledSubLink(theme) }} variant="body1">
              {child?.title}
            </Typography>
          </Link>
        ))}
      {lastChild && (
        <Typography sx={{ color: "primary.main" }}>
          <Typography variant="body1">{lastChild}</Typography>
        </Typography>
      )}
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
