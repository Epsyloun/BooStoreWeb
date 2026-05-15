import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  ListItemIcon,
  Tooltip,
  alpha,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUsers,
  FaBox,
  FaCog,
  FaArchive,
  FaPowerOff,
} from "react-icons/fa";
import { useAuthContext } from "../../context/useAuthContext";
import ImageBox from "../../../components/generic/ImageBox";

const logo =
  "https://firebasestorage.googleapis.com/v0/b/boo-store-cc6e5.firebasestorage.app/o/generic%2FLogoLetras.webp?alt=media&token=65fc8851-5aac-4fb1-8ab3-330fe85bdc02";
const SIDEBAR_WIDTH_COLLAPSED = "60px";
const SIDEBAR_WIDTH_EXPANDED = "250px";

export default function AdminSideBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuthContext();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAppBar, setShowAppBar] = useState(true);
  const lastScrollY = useRef(0);

  // Detectar scroll para mostrar/esconder AppBar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;

      // Mostrar si está en top o scrollea hacia arriba
      // Esconder si scrollea hacia abajo (y se queda escondido)
      const delta = Math.abs(currentScrollY - lastScrollY.current);

      if (currentScrollY < 50) {
        // Siempre mostrar en el top
        setShowAppBar(true);
      } else if (delta > 5) {
        // Solo cambiar si el delta es significativo (evita flickering)
        setShowAppBar(isScrollingUp);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Inicio", path: "/admin/home", icon: <FaHome size={20} /> },
    { label: "Usuarios", path: "/admin/users", icon: <FaUsers size={20} /> },
    { label: "Productos", path: "/admin/products", icon: <FaBox size={20} /> },
    {
      label: "Archivados",
      path: "/admin/archived-products",
      icon: <FaArchive size={20} />,
    },
    {
      label: "Configuraciones",
      path: "/admin/settings",
      icon: <FaCog size={20} />,
    },
    {
      label: "Regresar",
      path: "/",
      icon: <FaPowerOff size={20} />,
    },
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setOpenDrawer(false);
  };

  const menuContent = (
    <Box
      sx={{
        width: isMobile
          ? 300
          : isExpanded
            ? SIDEBAR_WIDTH_EXPANDED
            : SIDEBAR_WIDTH_COLLAPSED,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Header con Logo y Datos del Usuario */}
      <Box
        sx={{
          p: isExpanded || isMobile ? 2 : 1.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Logo */}
        <ImageBox
          src={logo}
          alt="Logo"
          delay={250}
          sx={{
            width: "auto",
            height: isMobile || isExpanded ? "45px" : "35px",
          }}
        />

        {/* Información del Usuario */}
        {(isExpanded || isMobile) && user && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {user.displayName || "Usuario"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {user.email}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Menú de Navegación */}
      <List sx={{ flex: 1, px: isMobile ? 2 : isExpanded ? 1.5 : 1.5 }}>
        {menuItems.map((item) => (
          <Tooltip
            key={item.path}
            title={isMobile || isExpanded ? "" : item.label}
            placement="right"
          >
            <ListItem
              onClick={() => handleMenuClick(item.path)}
              sx={{
                mb: 1,
                borderRadius: "8px",
                cursor: "pointer",
                px: isExpanded ? 0 : 0,
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor:
                    location.pathname === item.path
                      ? alpha(theme.palette.secondary.dark, 0.5)
                      : alpha(theme.palette.secondary.dark, 0.5),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  justifyContent: "center",
                  color:
                    location.pathname === item.path
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  ml: 1,
                  "& .MuiTypography-root": {
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  },
                }}
              />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Desktop: Sidebar fijo */}
      {!isMobile && (
        <Box
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          sx={{
            width: isExpanded
              ? SIDEBAR_WIDTH_EXPANDED
              : SIDEBAR_WIDTH_COLLAPSED,
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 10,
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            overflowY: "auto",
            overflowX: "hidden",
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.divider,
              borderRadius: "3px",
            },
          }}
        >
          {menuContent}
        </Box>
      )}

      {/* Mobile: AppBar + Drawer */}
      {isMobile && (
        <Stack direction="column" alignItems="center">
          <AppBar
            size="small"
            position="fixed"
            sx={{
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1100,
              backgroundColor: theme.palette.primary.main,
              transform: showAppBar ? "translateY(0)" : "translateY(-100%)",
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Toolbar>
              <IconButton
                onClick={toggleDrawer(true)}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  mr: 2,
                }}
              >
                <FaBars size={20} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Administración
              </Typography>
            </Toolbar>
          </AppBar>
          {/* Drawer que se abre desde el navbar */}
          <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
            {menuContent}
          </Drawer>
        </Stack>
      )}
    </>
  );
}
