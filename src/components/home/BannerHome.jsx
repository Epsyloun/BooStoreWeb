import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGamepad, FaHeadphones, FaKeyboard, FaMouse } from "react-icons/fa";
import {
  Box,
  Button,
  Container,
  Fade,
  Grow,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useInView } from "../../hook/useInView";

export default function BannerHome() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isClicked, setIsClicked] = useState(false);
  const { ref, inView } = useInView({ once: true });

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      navigate("/products");
    }, 800);
  };

  return (
    <Container ref={ref}>
      <Grow in={inView} timeout={1000}>
        <Box
          className="relative"
          sx={{
            backgroundColor: "background.default",
            height: "400px",
            mt: 4,
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            width: "100%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            className="font-title"
            sx={{ color: "white", fontWeight: "bold", fontSize: "3.5rem" }}
          >
            Bienvenido a Boo Store
          </Typography>

          <Typography sx={{ color: "white", mb: 4 }}>
            Tu tienda de confianza para todos tus productos
          </Typography>

          <Stack direction={"row"} sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                position: "relative",
                "&:hover .icons": {
                  opacity: 1,
                },
              }}
            >
              {/* Iconos flotantes */}
              <Box
                className="icons"
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  opacity: isClicked ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <FaGamepad
                  className={`${
                    isClicked ? "animate-icon-bounce-1" : "animate-float-1"
                  }`}
                  style={{
                    position: "absolute",
                    top: "-24px",
                    left: "-8px",
                    color: theme.palette.primary.main,
                  }}
                />

                <FaHeadphones
                  className={`${
                    isClicked ? "animate-icon-bounce-2" : "animate-float-2"
                  }`}
                  style={{
                    position: "absolute",
                    top: "-16px",
                    right: "-8px",
                    color: theme.palette.secondary.main,
                  }}
                />

                <FaKeyboard
                  className={`${
                    isClicked ? "animate-icon-bounce-3" : "animate-float-3"
                  }`}
                  style={{
                    position: "absolute",
                    bottom: "-24px",
                    left: "-16px",
                    color: theme.palette.secondary.main,
                  }}
                />

                <FaMouse
                  className={`${
                    isClicked ? "animate-icon-bounce-4" : "animate-float-4"
                  }`}
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    right: "-12px",
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>

              <Button
                onClick={handleClick}
                variant="contained"
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: "8px",
                  fontWeight: 600,

                  backgroundColor: "primary.main",
                  color: "white",

                  boxShadow: "0 0 15px rgba(153,41,234,0.5)",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    boxShadow:
                      "0 0 25px rgba(153,41,234,0.8), 0 0 50px rgba(153,41,234,0.4)",
                    transform: "scale(1.05)",
                    backgroundColor: "primary.main",
                  },
                }}
                className="animate-pulse-glow"
              >
                Ver Productos
              </Button>
            </Box>

            <Button
              onClick={() => navigate("/about")}
              variant="outlined"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: "8px",
                fontWeight: 600,
                color: "white",
                borderColor: "white",
                transition: "all 0.3s ease",

                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "white",
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
      </Grow>
    </Container>
  );
}
