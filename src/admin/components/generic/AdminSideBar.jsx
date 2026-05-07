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
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaHome, FaUsers, FaBox, FaCog } from "react-icons/fa";

const SIDEBAR_WIDTH_COLLAPSED = "60px";
const SIDEBAR_WIDTH_EXPANDED = "250px";

export default function AdminSideBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { label: "Inicio", path: "/admin/home", icon: <FaHome size={20} /> },
    { label: "Usuarios", path: "/admin/users", icon: <FaUsers size={20} /> },
    { label: "Productos", path: "/admin/products", icon: <FaBox size={20} /> },
    {
      label: "Configuraciones",
      path: "/admin/settings",
      icon: <FaCog size={20} />,
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

      {/* Mobile: Hamburguesa + Drawer */}
      {isMobile && (
        <>
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1200,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <FaBars size={20} />
          </IconButton>

          <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
            {menuContent}
          </Drawer>
        </>
      )}
    </>
  );
}
