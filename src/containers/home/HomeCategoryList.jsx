import React from "react";
import CategoryHomeButton from "../../components/home/CategoryHomeButton";
import { FaSuitcase } from "react-icons/fa6";
import { FaWrench } from "react-icons/fa6";
import { BiSolidJoystickButton } from "react-icons/bi";
import { BsNintendoSwitch } from "react-icons/bs";
import Ns2Logo from "../../assets/images/Ns2Logo.jsx";
import TitleComponent from "../../components/generic/TitleComponent.jsx";
import { Box, Container, Fade, Slide } from "@mui/material";
import { useInView } from "../../hook/useInView.jsx";

const categories = [
  { id: 1, title: "NS1", icon: <BsNintendoSwitch size={48} /> },
  {
    id: 2,
    title: "NS2",
    icon: <Ns2Logo width={86} height={"auto"} />,
  },
  {
    id: 3,
    title: "Estuches",
    icon: <FaSuitcase size={48} />,
  },
  { id: 4, title: "Repuestos", icon: <FaWrench size={48} /> },
  { id: 5, title: "Accesorios", icon: <BiSolidJoystickButton size={48} /> },
];

export default function HomeCategoryList() {
  const { ref, inView } = useInView();
  return (
    <Container>
      <TitleComponent title={"Categorías"} />

      <Box sx={{ overflowX: "hidden" }} ref={ref}>
        <Slide in={inView} direction="left" timeout={1000}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              p: 2,
              overflowX: "auto",
              overflowY: "visible",

              // ocultar scrollbar
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome/Safari
              },
            }}
          >
            {categories.map((category) => (
              <Box
                key={category.id}
                sx={{
                  flexShrink: 0,
                  minWidth: 140,

                  // md:
                  "@media (min-width:900px)": {
                    minWidth: 0,
                    flex: 1,
                  },
                }}
              >
                <CategoryHomeButton
                  title={category.title}
                  icon={category.icon}
                />
              </Box>
            ))}
          </Box>
        </Slide>
      </Box>
    </Container>
  );
}
