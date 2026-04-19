import React, { Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Container,
  Slide,
  Fade,
  Grow,
  useMediaQuery,
  Backdrop,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import MainSearchTextField from "../components/generic/MainSearchTextField";
import ImageBox from "../components/generic/ImageBox";
import { AnimatedText } from "../components/animated/AnimatedText";
const logo =
  "https://firebasestorage.googleapis.com/v0/b/boo-store-cc6e5.firebasestorage.app/o/generic%2FLogoLetras.webp?alt=media&token=65fc8851-5aac-4fb1-8ab3-330fe85bdc02";
const UrlLinks = [
  { name: "Productos", path: "/products" },
  { name: "Envíos", path: "/delivery" },
  { name: "Contacto", path: "/contact" },
  { name: "Acerca de", path: "/about" },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
                  sx={{ width: "auto", height: isMobile ? "40px" : "50px" }}
                />
                {/* <AnimatedText text="Boo Store" allDelay={0.7} /> */}
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

        {/* Sidebar (mobile) - Fullscreen Custom Drawer */}
        <Backdrop
          open={open}
          onClick={() => setOpen(false)}
          sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            backdropFilter: "blur(8px)",
            zIndex: 1200,
          }}
        />
        <MobileDrawer
          open={open}
          UrlLinks={UrlLinks}
          navigate={navigate}
          setOpen={setOpen}
        />
      </div>
    </Slide>
  );
}

const MobileDrawer = ({ open, UrlLinks, navigate, setOpen }) => {
  const theme = useTheme();
  return (
    <Fade in={open} timeout={300}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: alpha(theme.palette.background.default, 0.95),
          backdropFilter: "blur(10px)",
          zIndex: 1300,
          display: { xs: open ? "flex" : "none", lg: "none" },
          flexDirection: "column",
          animation: open
            ? "slideInRight 0.4s cubic-bezier(0.23, 1, 0.320, 1)"
            : "slideOutRight 0.4s cubic-bezier(0.770, 0, 0.175, 1)",
          "@keyframes slideInRight": {
            from: {
              transform: "translateX(100%)",
              opacity: 0,
            },
            to: {
              transform: "translateX(0)",
              opacity: 1,
            },
          },
          "@keyframes slideOutRight": {
            from: {
              transform: "translateX(0)",
              opacity: 1,
            },
            to: {
              transform: "translateX(100%)",
              opacity: 0,
            },
          },
        }}
      >
        {/* Header del Drawer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          {/* <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Menú
              </Typography> */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              color: theme.palette.primary.main,
              transition: "all 0.3s",
              "&:hover": {
                transform: "rotate(90deg) scale(1.1)",
              },
            }}
          >
            <IoClose size={24} />
          </IconButton>
        </Box>

        {/* Search en drawer */}
          <Box sx={{ pt: 2, px: 2 }}>
            <MainSearchTextField />
          </Box>

        {/* Links */}
        <Box
          component="nav"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
            overflow: "auto",
          }}
        >
          {UrlLinks.map((link, index) => (
            <Grow
              key={link.name}
              in={open}
              timeout={300 + index * 100}
              style={{ transformOrigin: "right center" }}
            >
              <Box
                onClick={() => {
                  navigate(link.path);
                  setOpen(false);
                }}
                sx={{
                  px: 2,
                  py: 2,
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.320, 1)",
                  background: alpha(theme.palette.primary.main, 0),
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "4px",
                    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    transform: "scaleY(0)",
                    transformOrigin: "top",
                    transition:
                      "transform 0.3s cubic-bezier(0.23, 1, 0.320, 1)",
                  },
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    paddingLeft: 3,
                    "&::before": {
                      transform: "scaleY(1)",
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "white",
                    transition: "all 0.3s",
                  }}
                >
                  {link.name}
                </Typography>
              </Box>
            </Grow>
          ))}
        </Box>

        {/* Footer del drawer */}
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            textAlign: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "gray" }}>
            © 2026 Boo Store
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};
