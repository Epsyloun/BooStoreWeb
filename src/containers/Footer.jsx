import React, { useEffect, useRef } from "react";
import {
  alpha,
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ImageBox from "../components/generic/ImageBox";
import Logo from "../assets/images/boo_logo.png";
import { Link } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";

export default function Footer() {
  return (
    <Stack
      component="footer"
      spacing={0}
      direction="column"
      sx={{
        backgroundColor: "primary.dark",
        color: "white",
        zIndex: 2,
      }}
    >
      <FooterNavbar />
      <FooterDivider />
      <FooterBottom />
    </Stack>
  );
}

const menuLinks = [
  {
    title: "Inicio",
    url: "/",
    children: [],
  },
  {
    title: "Productos",
    url: "/products",
    children: [
      {
        title: "Nintendo Switch 1",
        url: "/products/:switch",
      },
      {
        title: "Nintendo Switch 2",
        url: "/products/:switch2",
      },
      {
        title: "Estuches",
        url: "/products/:cases",
      },
      {
        title: "Repuestos",
        url: "/products/:replace",
      },
      {
        title: "Accesorios",
        url: "/products/:accessories",
      },
    ],
  },
  {
    title: "Contacto",
    url: "/contact",
    children: [],
  },
];

const styledLink = (theme) => ({
  cursor: "pointer",
  position: "relative",
  px: 0,
  py: 0.5,
  transition: "all 0.3s",
  "&:hover": {
    color: theme.palette.secondary.main,
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
    background: `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
    transition: "width 0.3s",
  },
  "&:hover::before": {
    width: "100%",
  },
});
const styledSubLink = (theme) => ({
  cursor: "pointer",
  position: "relative",
  px: 0,
  py: 0,
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

const FooterNavbar = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: "primary.dark", py: 2 }}>
      <Container>
        <Grid container direction="row" spacing={2} alignItems="center">
          {/* LOGO */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBox
              src={Logo}
              sx={{
                width: {
                  xs: "20%",
                  md: "40%",
                },
              }}
            />
          </Grid>

          {/* NAV */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* 💻 DESKTOP */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {menuLinks.map((link) => (
                <Stack key={link.title} direction="column" spacing={0.5}>
                  <Typography
                    component={Link}
                    to={link.url}
                    color="secondary"
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      textDecoration: "none",
                      ...styledLink(theme),
                    }}
                  >
                    {link.title}
                  </Typography>

                  {link.children.map((child) => (
                    <Typography
                      key={child.title}
                      component={Link}
                      to={child.url}
                      color="white"
                      sx={{
                        textDecoration: "none",
                        ...styledSubLink(theme),
                      }}
                    >
                      {child.title}
                    </Typography>
                  ))}
                </Stack>
              ))}
            </Stack>

            {/* 📱 MOBILE */}
            <Stack spacing={1} sx={{ display: { xs: "flex", md: "none" } }}>
              {menuLinks.map((link) => (
                <Accordion
                  key={link.title}
                  disableGutters
                  elevation={0}
                  sx={{
                    background: "transparent",
                    color: "white.main",
                    "&::before": {
                      backgroundColor: alpha(theme.palette.white.main, 0.3),
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      link.children.length > 0 ? (
                        <MdExpandMore style={{ color: "white" }} />
                      ) : null
                    }
                    sx={{
                      px: 2,
                      "& .MuiAccordionSummary-content": {
                        margin: 0,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        component={Link}
                        to={link.url}
                        variant="h6"
                        fontWeight="bold"
                        color="secondary"
                        sx={{
                          textDecoration: "none",
                          ...styledLink(theme),
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.title}
                      </Typography>
                    </Box>
                  </AccordionSummary>

                  {link.children.length > 0 && (
                    <AccordionDetails sx={{ px: 4 }}>
                      <Stack spacing={0.5}>
                        {link.children.map((child) => (
                          <Typography
                            key={child.title}
                            component={Link}
                            to={child.url}
                            color="white"
                            sx={{
                              textDecoration: "none",

                              ...styledSubLink(theme),
                            }}
                          >
                            {child.title}
                          </Typography>
                        ))}
                      </Stack>
                    </AccordionDetails>
                  )}
                </Accordion>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const FooterDivider = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
      }}
    >
      <Container>
        <Divider
          sx={{
            backgroundColor: alpha(theme.palette.white.main, 0.7),
            height: "4px",
            borderRadius: "50px",
            width: "100%",
          }}
        />
      </Container>
    </Box>
  );
};

const FooterBottom = () => {
  return (
    <Box
      sx={{
        p: 2,
        textAlign: "center",
        backgroundColor: "primary.dark",
        color: "white",
      }}
    >
      <Container>
        <Grid
          container
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              textAlign={{
                xs: "center",
                sm: "left",
              }}
            >
              &copy; {new Date().getFullYear()}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              textAlign={{
                xs: "center",
                sm: "right",
              }}
            >
              BooStore. Todos los derechos reservados.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
