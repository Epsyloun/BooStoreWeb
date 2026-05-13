import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import EditImage from "../components/product/EditImage";
import GeneralInfo from "../components/product/generalInfo";
import { useAuthContext } from "../context/useAuthContext";
import { getProductoInternoByProductId, saveOrUpdateProduct } from "../api/api";

const slideInFromRight = {
  "@keyframes slideInRight": {
    from: {
      opacity: 0,
      transform: "translateX(100px)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  animation: "slideInRight 0.3s ease-out",
};

const slideInFromLeft = {
  "@keyframes slideInLeft": {
    from: {
      opacity: 0,
      transform: "translateX(-100px)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  animation: "slideInLeft 0.3s ease-out",
};

export default function ViewOrEditProduct({
  open,
  onClose,
  viewOrEditMode,
  onNotification,
}) {
  const [value, setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const theme = useTheme();
  const handleChangeTab = (event, newValue) => {
    setPrevValue(value);
    setValue(newValue);
  };
  const getAnimationDirection = () => {
    return value > prevValue ? slideInFromRight : slideInFromLeft;
  };

  //Logica para cambio de datos del producto
  const { selectedProduct, setSelectedProduct } = useAuthContext();
  const [formData, setFormData] = useState(() =>
    JSON.parse(JSON.stringify(selectedProduct || {})),
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Actualizar formData cuando cambia selectedProduct desde el contexto
    const initialData = JSON.parse(JSON.stringify(selectedProduct || {}));
    if (!initialData.popularity) {
      initialData.popularity = "low";
    }
    setFormData(initialData);
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Solo actualizar la copia local, NO el contexto
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateFormData = (updates) => {
    setFormData({
      ...formData,
      ...updates,
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Guardar en Firebase/API
      const result = await saveOrUpdateProduct(formData);

      if (result.success) {
        // Actualizar el contexto con los cambios
        setSelectedProduct(JSON.parse(JSON.stringify(formData)));

        // Llamar al callback para mostrar notificación en la página padre
        if (onNotification) {
          onNotification(result.message, "success");
        }

        // Cerrar el modal inmediatamente
        onClose();
      } else {
        // Mostrar mensaje de error en la notificación de la página padre
        if (onNotification) {
          onNotification(
            result.message || "Error al guardar el producto",
            "error",
          );
        }
        console.error("Error al guardar:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      if (onNotification) {
        onNotification(error.message || "Error inesperado al guardar", "error");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          overflowX: "hidden",
          background: `linear-gradient(0deg, ${theme.palette.primary.background} 0%, ${theme.palette.primary.accent} 100%)`,
        },
      }}
    >
      <TitleSection onClose={onClose} />
      <Box
        id="tabs-container"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
        }}
      >
        <Container>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="basic tabs"
            variant="fullWidth"
            sx={{
              width: "100%",
              "& .MuiTabs-flexContainer": {
                width: "100%",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.secondary.main,
              },
              "& .MuiTab-root": {
                color: theme.palette.text.primary,
                flex: 1,
                "&.Mui-selected": {
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <Tab label="Información" />
            <Tab label="Imágenes" />
            <Tab label="Estadísticas" />
          </Tabs>
        </Container>
      </Box>
      {value === 0 && (
        <Box role="tabpanel" sx={getAnimationDirection()}>
          <GeneralInfo formData={formData} handleChange={handleChange} />
        </Box>
      )}
      {value === 1 && (
        <Box role="tabpanel" sx={getAnimationDirection()}>
          <EditImage
            formData={formData}
            onUpdateFormData={handleUpdateFormData}
          />
        </Box>
      )}
      {value === 2 && (
        <Box role="tabpanel" sx={getAnimationDirection()}>
          Item Three
        </Box>
      )}
      <ActionButtons
        onClose={onClose}
        handleSave={handleSave}
        isSaving={isSaving}
      />
    </Drawer>
  );
}

/* Header con título y botón cerrar */
const TitleSection = ({ onClose }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: theme.palette.background.paper,
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: 4,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Editar Producto
      </Typography>
      <IconButton
        onClick={onClose}
        sx={{
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <FaTimes size={20} />
      </IconButton>
    </Box>
  );
};

/* Botones de acción */
const ActionButtons = ({ onClose, handleSave, isSaving }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <Container>
        <Stack direction="row" spacing={2} sx={{ px: 4, py: 2, width: "100%" }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            loading={isSaving}
            onClick={handleSave}
          >
            Guardar Cambios
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
