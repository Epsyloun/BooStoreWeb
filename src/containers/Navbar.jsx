import React, { Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
  Slide,
  Fade,
  Grow,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { IoMenu } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import MainSearchTextField from "../components/generic/MainSearchTextField";
import ImageBox from "../components/generic/ImageBox";
import logo from "../assets/images/boo_logo.png";
import { AnimatedText } from "../components/animated/AnimatedText";

const UrlLinks = [
  { name: "Productos", path: "/products" },
  { name: "Envíos", path: "/delivery" },
  { name: "Contacto", path: "/contact" },
  { name: "Acerca de", path: "/about" },
];

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Slide direction="down" in={true} timeout={500}>
      <div>
        {/* Spacer */}
        <Toolbar />

        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: alpha(theme.palette.background.default, 0.7),
            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
            boxShadow: "0 4px 30px rgba(153,41,234,0.25)",
          }}
        >
          <Toolbar sx={{ display: "flex", gap: 2 }}>
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Logo */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flex: 1,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                <ImageBox
                  src={logo}
                  alt="Logo"
                  delay={250}
                  sx={{ width: 40, height: 40 }}
                />
                <AnimatedText text="Boo Store" allDelay={0.7} />
              </Box>

              {/* Search (solo desktop) */}
              <Box
                sx={{
                  flex: 2,
                  display: { xs: "none", lg: "block" },
                }}
              >
                <MainSearchTextField />
              </Box>

              {/* Links (desktop) */}
              <Box
                sx={{
                  flex: 2,
                  display: { xs: "none", lg: "flex" },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {UrlLinks.map((link, index) => (
                  <Fragment key={link.name}>
                    <Box
                      onClick={() => navigate(link.path)}
                      sx={{
                        cursor: "pointer",
                        position: "relative",
                        px: 1,
                        py: 0.5,
                        transition: "all 0.3s",
                        "&:hover": {
                          color: theme.palette.primary.main,
                          transform: "scale(1.1)",
                          textShadow: `0 0 8px ${alpha(
                            theme.palette.primary.main,
                            0.8,
                          )}`,
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: 0,
                          height: "2px",
                          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          transition: "width 0.3s",
                        },
                        "&:hover::before": {
                          width: "100%",
                        },
                      }}
                    >
                      {link.name}
                    </Box>

                    {index < UrlLinks.length - 1 && (
                      <Typography color="gray">|</Typography>
                    )}
                  </Fragment>
                ))}
              </Box>

              {/* Cart */}
              {/* <IconButton
              sx={(theme) => ({
                color: "white",
                transition: "all 0.3s",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "scale(1.2)",
                  filter: `drop-shadow(0 0 8px ${alpha(
                    theme.palette.primary.main,
                    0.8,
                  )})`,
                },
              })}
            >
              <FaShoppingCart />
            </IconButton> */}

              {/* Menu button (mobile) */}
              <IconButton
                sx={{
                  display: { xs: "flex", lg: "none" },
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white.main",
                  height: "46px",
                  width: "46px",
                }}
                onClick={() => setOpen(true)}
              >
                <IoMenu />
              </IconButton>
            </Container>
          </Toolbar>
        </AppBar>

        {/* Sidebar (mobile) */}
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 250 }}>
            <List>
              {UrlLinks.map((link) => (
                <ListItemButton
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setOpen(false);
                  }}
                >
                  <ListItemText primary={link.name} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      </div>
    </Slide>
  );
}
